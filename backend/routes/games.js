const express = require("express");
const Game=require('../models/game');
const router = express.Router();

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

module.exports = router;
