import mongoose from "mongoose";

const optionSchema = mongoose.Schema({
  content: {
    type: String,
    require: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
  voteCount: {
    type: Number,
    default: 0,
  },
  vote: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vote",
    },
  ],
});

const OptionModel = mongoose.model("option", optionSchema);
export default OptionModel;
