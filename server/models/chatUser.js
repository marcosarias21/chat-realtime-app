import mongoose from "mongoose";

const chatRoom = new mongoose.Schema({
  users: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  message: [
    {
      sender: { type: mongoose.Schema.ObjectId, ref: "User" },
      text: String,
      filename: String,
      buffer: String,
    },
  ],
});
export default mongoose.model("ChatRoom", chatRoom);
