const express = require("express");
var morgan = require("morgan");
var cors = require("cors");

const app = express();
const port = 3001;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors(["*"]));

const arrText = ["mauricio"];

app.post("/", (req, res) => {
  try {
    const { text } = req.body;

    if (text.trim() !== "" || text !== null) {
      arrText.push(text);
      res.status(200).json({ message: "ok", arrText });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
});

app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "ok", arrText });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
