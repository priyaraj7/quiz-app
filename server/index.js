const express = require("express");
const questions = require("./quiz.js");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  res.json(questions);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
