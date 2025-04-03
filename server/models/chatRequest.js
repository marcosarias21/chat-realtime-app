import mongoose from "mongoose";

const chatRequest = new mongoose.Schema({
  sender: { type: mongoose.Schema.ObjectId, ref: "User" },
  receiver:  { type: mongoose.Schema.ObjectId, ref: "User" },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }
})

export default mongoose.model("ChatRequest", chatRequest)