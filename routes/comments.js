const express = require("express");

const router = express.Router();

const commentController = require("../controllers/comment");
const replyController = require("../controllers/replyController");

router.post("/comment", commentController.addComment);

router.delete("/comment", commentController.deleteComment);

router.post("/comment/reply", commentController.addReply);

router.get("/comment/:id", commentController.getAllCommentsByProductId);
router.put("/comment", commentController.updateComment);
router.get("/comment/g/:id", commentController.getCommentById);
router.get("/comment/stat/:id", commentController.getCommentStatistics);

router.post("/reply", replyController.addReply);
router.get("/reply/:id", replyController.getReplyByCommentId);

module.exports = router;
