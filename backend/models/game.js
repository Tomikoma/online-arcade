mongoose=require("mongoose");

const gameSchema = mongoose.Schema({
  title: { type: String, required: true }, //kell még ide cucc
  content: { type: String, required: true }
});

module.exports = mongoose.model('Game', gameSchema);
