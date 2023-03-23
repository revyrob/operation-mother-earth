const express = require("express");
const router = express.Router();
const Story = require("../models/SchemaStory.js");

/*
 *Connection to MongoDB
 */
router.get("/", async (req, res) => {
  try {
    const storyboards = await Story.find();
    res.send(storyboards);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
});

module.exports = router;
