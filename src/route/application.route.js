import express from "express";
import VoteController from "../controller/vote.controller.js";

const router = express.Router();
const vote = new VoteController();

router.post("/questions/create", vote.createQuestion);
router.post("/questions/:id/options/create", vote.addOption);
router.delete("/questions/:id/delete", vote.deleteOption);
router.post("/options/:id/add_vote", vote.addvote);
router.delete("/questions/:id", vote.deleteQuestion);
router.get("/questions/:id", vote.viewQuestion);

export default router;
