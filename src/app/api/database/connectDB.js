import mongoose from "mongoose";

// let isConnected = false;
export const connectMongoose = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "feedback",
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log(error);
  }
};


