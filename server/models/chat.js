import mongoose from "mongoose";

const chat = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref:  "User"},
  message: String,
})

export default mongoose.model("Chat", chat)