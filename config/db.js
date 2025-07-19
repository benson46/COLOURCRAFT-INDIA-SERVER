import mongoose from "mongoose";
import { env } from "./env.js";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose
      .connect(env.MONGO_URI)
      .then(() => console.log("MongoDB connected successfully!"));
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;  