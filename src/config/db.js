import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Db connected");
  } catch (error) {
    console.log("Error:", error.message);
  }
};

export default dbConnection;
