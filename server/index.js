import express from "express";
import logger from "morgan";
import http from 'http'
import { Server } from "socket.io";
import cors from 'cors'
import mongoose from "mongoose";
import connectDB from "./database/db.js";
import Chat from './models/chat.js'
import ChatRequest from './models/chatRequest.js'
import registerRoute from './routes/register.js'
import login from './routes/login.js'
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
  const messages = await Chat.find({}).populate("user", "username");
  return io.emit("chat_message", messages);
}

io.on("connection", async (socket) => {
  getMessages()
  
  socket.on("chat_message", async (message, id_user) => {
    
    
    const newChat = new Chat({
      user: id_user,
      message,
    });
    await newChat.save();
    await getMessages()
    
  });
  
  
  socket.on("chat_request", async ({ sender, receiver }) => {
    const newChatRequest = new ChatRequest({
      sender: sender,
      receiver: receiver,
      status: "pending",
    });
    
    await newChatRequest.save();
    
    io.to(receiver).emit("notification", {
      sender: sender,
      message: "Tienes una petición de chat",
    });
  })
})


app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: '*',
}));
app.use('/register', registerRoute)
app.use('/login', login)
mongoose.set('strictQuery', true)
server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})