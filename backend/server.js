import express from "express";
import bodyParser from "body-parser";
import nanobuffer from "nanobuffer";
import morgan from "morgan";

// დამატე მინიჭებული მასივი
const msg = new nanobuffer(50);
const getMsgs = () => Array.from(msg).reverse();

// გამოიყენე აქვე, ეს მხოლოდ სერვერს გადასცემს მინიჭებული შეტყობინება
msg.push({
  user: "brian",
  text: "hi",
  time: Date.now(),
});

// get express ready to run
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static("frontend"));

app.get("/poll", function (req, res) {
  // გამოიყენე getMsgs რომ მისამართოს შეტყობინებები
  // დაწერე კოდი აქვე
});

app.post("/poll", function (req, res) {
  // დაამატე ახალი შეტყობინება სერვერზე
  // დაწერე კოდი აქვე
});

// start the server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`listening on http://localhost:${port}`);
