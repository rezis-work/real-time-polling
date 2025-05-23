import express from "express";
import bodyParser from "body-parser";
import nanobuffer from "nanobuffer";
import morgan from "morgan";

// დამატე მინიჭებული მასივი
const msg = new nanobuffer(50);
const getMsgs = () => Array.from(msg).reverse();

// გამოიყენე აქვე, ეს მხოლოდ სერვერს გადასცემს მინიჭებული შეტყობინება
msg.push({
  user: "Anar",
  text: "hi",
  time: Date.now(),
});

// get express ready to run
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static("frontend"));

app.get("/poll", function (req, res) {
  res.status(Math.random() > 0.5 ? 200 : 500).json({
    msg: getMsgs(),
  });
});

app.post("/poll", function (req, res) {
  const { user, text } = req.body;

  msg.push({
    user,
    text,
    time: Date.now(),
  });

  res.json({
    status: "ok",
  });
});

// start the server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`listening on http://localhost:${port}`);
