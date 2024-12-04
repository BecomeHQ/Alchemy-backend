const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("mongoose connected successfully");
  })
  .catch((error) => {
    console.error("connection error:", error.message);
  });
