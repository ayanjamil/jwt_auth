const express = require("express");
const mongoose = require("mongoose");
const app = express();

// const mongoURI =
//   "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.0";

const mongoURI = "mongodb://127.0.0.1:27017/users";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true, // To avoid deprecation warning for `ensureIndex`
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB successfully");
});

const authRoutes = require("./routes/auth");
const protectedRoute = require("./routes/protectedRoute");
const base = require("./routes/base");
app.use(express.json());
app.use("/", base);
app.use("/auth", authRoutes);
app.use("/protected", protectedRoute);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
