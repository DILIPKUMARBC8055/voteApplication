import mongoose, { mongo } from "mongoose";

const voteSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  option: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "option",
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question",
  },
});

const VoteModel = mongoose.model("vote", voteSchema);
export default VoteModel;
