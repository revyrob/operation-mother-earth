const express = require("express");
const router = express.Router();
const fs = require("fs");
const Videos = require("../models/SchemaVideos.js");
const QA = require("../models/SchemaQA.js");

/*
 *Connection to MongoDB
 */
router.get("/", async (req, res) => {
  try {
    const dataVideos = await Videos.find();
    res.send(dataVideos);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
});

/*
 *Connection to MongoDB
 */
router.get("/questions", async (req, res) => {
  try {
    const dataQA = await QA.find();
    res.send(dataQA);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
});

/*
 *posting to mongodb database questionsanswers
 */
router.post("/questions/new", (req, res) => {
  let newQuestion = {
    questions: req.body.question,
    answer: "Will be answered soon...",
  };
  new QA(newQuestion).save();
});

/*
 *Connection to MongoDB
 */
router.get("/questions/:id", async (req, res) => {
  try {
    const dataQA = await QA.findOne({ _id: req.params.id });
    res.send(dataQA);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
});

/*
 *Connection to MongoDB
 */
router.get("/:id", async (req, res) => {
  try {
    const videoData = await Videos.findOne({ _id: req.params.id });
    res.send(videoData);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
});

module.exports = router;
