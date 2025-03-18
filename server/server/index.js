import express from "express";
import logger from "morgan";
import http from 'http'
import { Server } from "socket.io";

const port = 3000

const app = express( )
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
})


io.on("connection", (socket) => {
  console.log("User has connected!", socket.id)
})

app.use(logger('dev'))

server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})