const mongoose=require("mongoose");

const rateSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true},
  gameId: { type: mongoose.Schema.Types.ObjectId, required: true},
  rating: { type: Number, required: true}
});


module.exports = mongoose.model('Rate', rateSchema);
