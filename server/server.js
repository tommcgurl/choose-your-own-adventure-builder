const express = require("express");
require("dotenv").config();

const app = express();
const adventuresRouter = require("./routes/adventures");

const port = process.env.PORT || 8000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use("/adventures", adventuresRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
