const express = require("express");
const app = express(); //an instance of express
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./database/db");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const ownerProfileRoutes = require("./routes/ownerprofile");
const inquiryRoutes = require("./routes/inquiry");
const verifyEmailRoutes = require("./routes/emailverify");
const dashboardRoutes = require("./routes/dashboard");

/********************
 * MIDDLEWARES
 ********************/
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/ownerprofile", ownerProfileRoutes);
app.use("/user", inquiryRoutes);
app.use("/emailverify", verifyEmailRoutes);
app.use("/emailverify/owner", verifyEmailRoutes);
app.use("api/dashboard", dashboardRoutes);

app.use(require("./routes/emailverify"));
app.use(require("./routes/profile"));
app.use(require("./routes/ownerprofile"));
app.use(require("./routes/dashboard"));

connectDB();

app.get("/", (req, res) => {
  res.send("inside server");
});

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
