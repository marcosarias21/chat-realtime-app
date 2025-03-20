import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";
dotenv.config();

const connectDB = async () => {
  const DB = process.env.DB

  try {
    await mongoose.connect(DB)
    console.log("Connect to DB")
  } catch (error) {
    console.log(error)
   }
}

mongoose.set('strictQuery', true)

export default connectDB;