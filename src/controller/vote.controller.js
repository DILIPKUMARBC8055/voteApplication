// Importing the custom error handler
import ApplicationError from "../errorHandling/custom.Error.js";
// Importing the QuestionModel schema
import QuestionModel from "../model/question.schema.js";
// Importing the OptionModel schema
import OptionModel from "../model/options.schme.js";
// Importing mongoose for MongoDB interaction
import mongoose from "mongoose";
// Importing the VoteModel schema
import VoteModel from "../model/vote.schme.js";

// Importing ObjectId from mongodb package
import mongdb, { ObjectId } from "mongodb";

// Exporting the VoteController class
export default class VoteController {
  
  // Method to view a question along with its options and vote count for each option
  async viewQuestion(req, res) {
    try {
      const questionId = req.params.id;

      // Find the question by its ID and populate its options
      const question = await QuestionModel.findById(questionId).populate("options");

      if (!question) {
        return res.status(404).json({
          success: false,
          message: "Question with questionID NOT found",
        });
      }

      // Find options for the question and select only necessary fields
      const options = await OptionModel.find({ question: new ObjectId(questionId) }).select({ _id: 0, content: 1, voteCount: 1 });

      // Returning the question details along with options and total vote count
      return res.status(200).json({
        success: true,
        question: {
          _id: question._id,
          question: question.question,
          options: options,
          totalVoteCount: question.votes.length,
        },
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({
        success: false,
        message: "Operation failed due to some internal server error",
      });
    }
  }

  // Method to create a new question
  async createQuestion(req, res) {
    try {
      const { question } = req.body;
      const newQuestion = new QuestionModel({ question: question });
      await newQuestion.save();
      res.status(201).json({
        success: true,
        message: "Question added successfully",
        content: newQuestion,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: "Unable to add question" });
      throw new ApplicationError(error, 500);
    }
  }

  // Method to add a new option to a question
  async addOption(req, res) {
    try {
      const id = req.params.id;
      const { content } = req.body;
      const question = await QuestionModel.findById(id);
      if (!question) {
        return res.status(400).json({
          success: false,
          message: "Question with questionID NOT found",
        });
      }
      const newOption = new OptionModel({
        content: content,
        question: new mongoose.Types.ObjectId(id),
      });
      await newOption.save();

      question.options.push(newOption);
      await question.save();
      return res.status(201).json({
        success: true,
        message: "Option added to the question successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Operation failed due to some internal server error",
      });
      throw new ApplicationError(error, 500);
    }
  }

  // Method to add a vote to an option
  async addvote(req, res) {
    try {
      const id = req.params.id;
      const { content, username } = req.body;
      const question = await QuestionModel.findById(id);
      if (!question) {
        return res.status(400).json({
          success: false,
          message: "Question with questionID NOT found",
        });
      }

      // Find the option by content
      const foundOption = await OptionModel.findOne({ content: content });
      if (!foundOption) {
        return res.status(400).json({
          success: false,
          message: "Option with content not found",
        });
      }

      // Create new vote and save
      const newVote = new VoteModel({
        username: username,
        option: foundOption._id,
        question: question._id,
      });
      await newVote.save();

      // Update option and question vote counts
      question.votes.push(newVote._id);
      foundOption.vote.push(newVote._id);
      foundOption.voteCount++;
      await question.save();
      await foundOption.save();

      return res.status(201).json({ success: true, message: "Voted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Operation failed due to some internal server error",
        reason: error.message,
      });

      throw new ApplicationError(error, 500);
    }
  }

  // Method to delete a question
  async deleteQuestion(req, res) {
    try {
      const questionId = req.params.id;

      // Find the question by its ID
      const question = await QuestionModel.findById(questionId).populate("options");
      if (!question) {
        return res.status(404).json({
          success: false,
          message: "Question not found",
        });
      }

      // Check if any of the question's options have votes
      const optionsWithVotes = question.options.filter((option) => option.vote.length > 0);
      if (optionsWithVotes.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Question cannot be deleted as it has options with votes",
          optionsWithVotes: optionsWithVotes.map((option) => option.content),
        });
      }

      // Delete the question and its associated options
      await QuestionModel.findByIdAndDelete(questionId);
      await OptionModel.deleteMany({ question: questionId });

      return res.status(200).json({
        success: true,
        message: "Question deleted successfully",
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({
        success: false,
        message: "Operation failed due to some internal server error",
      });
    }
  }

  // Method to delete an option
  async deleteOption(req, res) {
    try {
      const { optionContent } = req.body;

      // Find the question by its ID
      const question = await QuestionModel.findById(req.params.id);
      if (!question) {
        return res.status(404).json({
          success: false,
          message: "Question not found",
        });
      }

      // Find the option by its content and associated question ID
      const option = await OptionModel.findOne({
        content: optionContent,
        question: question._id,
      });
      if (!option) {
        return res.status(404).json({
          success: false,
          message: "Option not found for the given question",
        });
      }

      // Check if the option has any votes
      if (option.vote.length >= 1) {
        return res.status(400).json({
          success: false,
          message: "Option cannot be deleted as it has votes",
        });
      }

      // Delete the option and remove its reference from the question's options array
      await OptionModel.findByIdAndDelete(option._id);
      question.options.pull(option._id);
      await question.save();

      return res.status(200).json({
        success: true,
        message: "Option deleted successfully",
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({
        success: false,
        message: "Operation failed due to some internal server error",
      });
    }
  }
}
