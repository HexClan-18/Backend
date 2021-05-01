const express = require("express");
const app = express(); //an instance of express
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./database/db");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const inquiryRoutes = require("./routes/inquiry");

/************************************
 * MIDDLEWARES
 ************************************/

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/user", inquiryRoutes);

app.use(require("./routes/profile"));

connectDB();

app.get("/", (req, res) => {
  res.send("inside server");
});

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
