import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log("[MongoDB] Connected");
  } catch (error) {
    console.error("[MongoDB]", error);
    process.exit(1);
  }
};

connectDB();
