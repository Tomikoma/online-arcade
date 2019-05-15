const mongoose=require("mongoose");

const rateSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true},
  game_id: { type: mongoose.Schema.Types.ObjectId, required: true},
});


module.exports = mongoose.model('Rate', rateSchema);
