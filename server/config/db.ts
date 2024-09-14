import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('The "MONGODB_URI" environment variable is not defined');
    }

    await mongoose.connect(process.env.MONGODB_URI, { dbName: "tabadol_db" });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
