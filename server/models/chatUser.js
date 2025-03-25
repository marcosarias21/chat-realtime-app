import mongoose from "mongoose";

const userChat = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  message: { type: string }
})