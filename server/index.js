import express from "express";
import logger from "morgan";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./database/db.js";
import Chat from "./models/chat.js";
import ChatRequest from "./models/chatRequest.js";
import registerRoute from "./routes/register.js";
import login from "./routes/login.js";
import ChatRoom from "./models/chatUser.js";
const port = 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

connectDB();

const getMessages = async () => {
  const messages = await Chat.find({}).populate("user", "username");
  return io.emit("chat_message", messages);
};

const users = new Map();

io.on("connection", async (socket) => {
  getMessages();

  socket.on("user_logged", async (userId) => {
    users.set(userId, socket.id);
    const pendingRequest = await ChatRequest.findOne({
      receiver: userId,
    }).populate("sender", "username");
    if (pendingRequest) {
      io.to(socket.id).emit("notification", pendingRequest);
    }

    const chatAvailableUser = await ChatRoom.findOne({ userId }).populate(
      "users",
      "username"
    );

    const user = users.get(userId);
    console.log(user);
    console.log(chatAvailableUser);

    io.to(user).emit("chat_available", [chatAvailableUser]);
    io.emit("users_connected", Object.fromEntries(users));
  });

  socket.on("chat_message", async (message, id_user) => {
    const newChat = new Chat({
      user: id_user,
      message,
    });
    await newChat.save();
    await getMessages();
  });

  socket.on("chat_request", async (sender, receiver) => {
    const existingChat = await ChatRequest.findOne({ sender, receiver });

    if (existingChat) return;

    const chatRequest = new ChatRequest({
      sender,
      receiver,
      status: "pending",
    });
    const receiverSocketId = users.get(receiver);
    await chatRequest.save();

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("notification", {
        sender,
        message: "Tienes una nueva petición de chat",
      });
    } else {
      console.log(" El usuario no está conectado.");
    }
  });

  socket.on("chat_accepted", async (idChatRequest, sender, receiver) => {
    const chatRequest = await ChatRequest.findById(idChatRequest);
    chatRequest.status = "accepted";
    await chatRequest.save();
    const newChatRoom = new ChatRoom({
      users: [sender, receiver],
      message: [],
    });
    await newChatRoom.save();
    const userReceiver = users.get(receiver);
    io.to(userReceiver).emit("notify_chat_accepted", newChatRoom);
  });

  socket.on("joinRoom", async (roomID) => {
    socket.join(roomID);

    const room = await ChatRoom.findById(roomID)
      .populate({
        path: "message.sender",
        select: "username",
      })
      .populate({
        path: "users",
        select: "username",
      });

    if (room) {
      io.to(roomID).emit("room_created", room);
    } else {
      io.to(socket.id).emit("room_error", "La sala no existe");
    }
  });

  socket.on(
    "send_message",
    async ({ roomID, text, id_user, filename, buffer }) => {
      console.log("Guardar mensaje:", {
        text,
        sender: id_user,
        filename,
        buffer,
      });
      const room = await ChatRoom.findById(roomID);

      room.message.push({
        text,
        sender: id_user,
        filename: filename || null,
        buffer: buffer || null,
      });

      await room.save();

      const updatedRoom = await ChatRoom.findById(roomID).populate({
        path: "message.sender",
        select: "username",
      });

      io.to(roomID).emit("new_message", updatedRoom);
    }
  );
  socket.on("disconnect", () => {
    console.log("🔌 Usuario desconectado:", socket.id);
    for (const [key, value] of users.entries()) {
      if (value === socket.id) {
        users.delete(key);
        break;
      }
    }
    io.emit("users_connected", Object.fromEntries(users));
  });
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);
app.use("/register", registerRoute);
app.use("/login", login);
mongoose.set("strictQuery", true);
server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
