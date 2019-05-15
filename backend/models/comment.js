const mongoose=require("mongoose");

const commentSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true},
  game_id: { type: mongoose.Schema.Types.ObjectId, required: true},
});


module.exports = mongoose.model('Comment', commentSchema);
