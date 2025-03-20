import express from "express";
import logger from "morgan";
import http from 'http'
import { Server } from "socket.io";
import cors from 'cors'
import mongoose from "mongoose";
import connectDB from "./database/db.js";
import Chat from './models/chat.js'

const port = 3000

const app = express( )
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
})

connectDB()

const getMessages = async () => {
  const messages = await Chat.find({});
  io.emit("chat_message", messages);
}

io.on("connection", async (socket) => {
  console.log("User has connected!", socket.id);
  getMessages()

  socket.on("chat_message", async (message, id) => {
    const newChat = new Chat({
      username: id,
      message,
    });
    await newChat.save();
    getMessages()
  });




})

app.use(logger('dev'))
app.use(cors())
mongoose.set('strictQuery', true)
server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})