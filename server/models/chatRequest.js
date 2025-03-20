import mongoose from "mongoose";

const chatRequest = mongoose.Schema({
  sender: String,
  receiver: String,
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }
})

export default mongoose.model("ChatRequest", chatRequest)