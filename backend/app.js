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

games = [
  {
    id: '1',
    title: 'Pac-man',
    releaseDate: new Date(1980),
    genre: 'Action',
    description: 'Lorem ipsum balblablalbla',
    modes: ['Single', 'Multi']
  },
  {
    id: '2',
    title: 'Pac-man2',
    releaseDate: new Date(1985),
    genre: 'Action',
    description: 'Lorem ipsum balblablalbla2',
    modes: ['Single', 'Multi']
  },
  {
    id: '3',
    title: 'Pac-man3',
    releaseDate: new Date(1985),
    genre: 'Action',
    description: 'Lorem ipsum balblablalbla2',
    modes: ['Single', 'Multi']
  },
  {
    id: '4',
    title: 'Pac-man4',
    releaseDate: new Date(1985),
    genre: 'Action',
    description: 'Lorem ipsum balblablalbla2',
    modes: ['Single', 'Multi']
  },

];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.get("/api/games", (req,res,next) => {
  res.status(200).json({
    message: "Posts fetched successfully",
    games: games
  });
});

module.exports = app;
