const { webcrypto } = require("crypto");
if (typeof globalThis.crypto === "undefined") {
  globalThis.crypto = webcrypto;
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI || "mongodb://mongodb:27017/quicktask";
mongoose.connect(mongoUri)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

const taskRoutes = require("./routes/taskRoutes");
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});