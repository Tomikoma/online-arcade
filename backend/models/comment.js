const mongoose=require("mongoose");

const commentSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true},
  gameId: { type: mongoose.Schema.Types.ObjectId, required: true},
  content: { type: String, required: true},
  commentDate: { type: Date, required: true}
});


module.exports = mongoose.model('Comment', commentSchema);
