mongoose=require("mongoose");

const gameSchema = mongoose.Schema({
  title: { type: String, required: true }, //kell még ide cucc
  releaseDate: { type: Date, required: true },
  genre: { type: String, required: true },
  images: { type: [String], required: true },
  description: { type: String, required: true },
  modes: { type: [String], required: true }
});

module.exports = mongoose.model('Game', gameSchema);
