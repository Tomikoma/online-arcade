const express = require("express");
const User=require('../models/user');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", (req,res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        name: req.body.name,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
             message: 'User created!',
             result: result
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err,
            message: "Couldn't create user"
          })
        });
    });
});

router.post("/login", (req,res,next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email})
    .then(user => {
      if(!user){
        return res.status(401).json({
          message: "Auth Failed"
        })
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result){
        return res.status(401).json({
          message: "Auth Failed"
        });
      }
      const token = jwt.sign(
        {email: fetchedUser.email, userId: fetchedUser._id},
        "my_secret_long_strong_hard_to_guess_private_key",
        { expiresIn: "1h"}
        );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      })

    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth Failed"
      });
    })
});

module.exports = router;
