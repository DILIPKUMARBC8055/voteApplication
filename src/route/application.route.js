import express from "express";
import VoteController from "../controller/vote.controller.js";

const router = express.Router();
const vote = new VoteController();

// /questions/create (To create a question)
// - /questions/:id/options/create (To add options to a specific question)
// - /questions/:id/delete (To delete a question)
// - /options/:id/delete (To delete an option)
// - /options/:id/add_vote (To increment the count of votes)
// - /questions/:id (To view a question and it’s options)
// - The API will look like this (Pay close attention to the link_to_vote, because that’s
// tricky part, you’ll need to insert it dynamically):

router.post("/questions/create", vote.createQuestion);
router.post("/questions/:id/options/create", vote.addOption);
router.delete("/questions/:id/delete", vote.deleteOption);
router.post("/options/:id/add_vote", vote.addvote);
router.delete("/questions/:id", vote.deleteQuestion);
router.get("/questions/:id", vote.viewQuestion);

export default router;
