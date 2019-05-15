const express = require("express");
const Game=require('../models/game');
const Rate=require('../models/rate');
const Comment = require('../models/comment');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const gameQuery = Game.find();
  let fetchedGames;
  if (pageSize && currentPage){
    gameQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  gameQuery.then(documents => {
    fetchedGames = documents;
    return Game.countDocuments();
  })
  .then(count => {
    res.status(200).json({
      message: "Games fetched successfully!",
      games: fetchedGames,
      maxGames: count
    });
  })
});

router.get("/:id", (req, res, next) => {
  gameId= req.params.id;
  let game;
  Game.findById(gameId)
    .then(gameData => {
      game = gameData;
      res.status(200).json({
        game: game
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong!"
      })
    });

});


router.post("/rate", checkAuth, (req, res, next) => {
  userId=req.userData.userId;
  gameId=req.body.gameId;
  rating=req.body.rating;
  Rate.findOne({userId:userId,gameId:gameId})
  .then(rateData => {
    if(!rateData){
      const rate= new Rate({userId:userId,gameId:gameId,rating:rating});
      rate.save(result =>{
        res.status(201).json({
          message: "Game got rated"
        })
      })
    } else {
      const rate = new Rate({_id: rateData._id, userId:userId,gameId:gameId,rating:rating});
      rateId=rateData._id;
      Rate.findByIdAndUpdate({_id:rateId},{rating:rating})
        .then(result => {
          if(result.nModified === 0){
            res.status(500).json({
              message:"Couldn't update the rating"
            });
          } else {
            res.status(202).json({
              message:"Game rating updated"
            });
          }
        });
    }
  })
});

router.get("/rate/:id", (req, res, next) => {
  gameId=req.params.id;
  Rate.find({gameId:gameId})
    .then(result => {
      if(!result[0]) {

        res.status(200).json({
          rating: 0,
          count: 0
        });
      } else {
        Rate.aggregate(
    [
      {$match: {}},
      {$group: {_id:"$gameId", total: {$avg: "$rating"} } }
    ]
  ).then(result =>{
    const rating = result.filter(function(res){
      return res._id == gameId;
    })[0].total;
    Rate.countDocuments({gameId: gameId})
    .then(countData => {
      res.status(200).json({
        rating:rating,
        count: countData
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong!(Rate)"
      });
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong!(Rate)"
    });
  });
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong!(Rate)"
      })
    })


});

router.post("/comment", checkAuth, (req, res, next) =>{
  gameId = req.body.gameId;
  userId = req.userData.userId;
  content = req.body.content;
  commentDate = req.body.commentDate;
  Comment.findOne({userId:userId,gameId:gameId})
    .then(commentData => {
      if(!commentData){
        const comment = new Comment({
          userId: userId,
          gameId: gameId,
          content: content,
          commentDate: commentDate
        });
        comment.save()
          .then(result => {
            res.status(201).json({
              message: "Comment has added"
            });
          }).catch(err => {
            console.log(err);
            res.status(500).json({
              message: "Something went wrong (Comment)"
            })
          });
      } else {
        res.status(403).json({
          message: "You can comment only once!"
        });
      }
    })
});

router.get("/comment/:id", (req, res, next) => {
  gameId=req.params.id;
  Comment.find({gameId:gameId})
    .then(result => {
      res.status(200).json({
        comments: result
      })
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        message:"Something went wrong (Comment)"
      });
    });
});

module.exports = router;
