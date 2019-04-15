const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose")
const Game=require('./models/game');

const app=express();

mongoose.connect("mongodb+srv://tom:MVwYEXXFzW1r5sVa@onlinearcade-1uy5h.mongodb.net/test?retryWrites=true",
{useNewUrlParser: true})
.then(() => {
  console.log("Connected to database!");
})
.catch(() => {
  console.log("Connection failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


module.exports = app;
