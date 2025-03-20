import mongoose from "mongoose";

const chat = new mongoose.Schema({
  username: String,
  message: String,
})

export default mongoose.model("Chat", chat)