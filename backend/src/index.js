const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
require("dotenv").config();
const { userRoutes } = require("./routes/user.route");

const { connection } = require("./config/db");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Home page");
});

app.use(cors());

app.use("/", userRoutes);

// app.use("/", orderRoutes);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (err) {
    console.log("Error connnecting to DB");
    console.log(err);
  }
  console.log(`listening on PORT ${PORT}`);
});
