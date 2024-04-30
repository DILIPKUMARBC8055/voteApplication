import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
  question: { type: String, require: true },
  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "option",
    },
  ],
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vote",
    },
  ],
});

const QuestionModel = mongoose.model("Question", questionSchema);
export default QuestionModel;
