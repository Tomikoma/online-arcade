const path = require("path");
const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose")

const gamesRoutes = require("./routes/games");
const userRoutes = require("./routes/user");
const app=express();


mongoose.connect("mongodb+srv://tom:MVwYEXXFzW1r5sVa@onlinearcade-1uy5h.mongodb.net/node-angular?retryWrites=true",
{useNewUrlParser: true})
.then(() => {
  console.log("Connected to database!");
})
.catch(() => {
  console.log("Connection failed!");
});

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


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

app.use("/api/games", gamesRoutes);
app.use("/api/user", userRoutes);


module.exports = app;
