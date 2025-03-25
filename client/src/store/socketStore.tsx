import { io, Socket } from "socket.io-client";
import { create } from "zustand";

type SocketState = {
  socket: Socket
}

export const useSocketState = create<SocketState>(() =>({
  socket: io("http://localhost:3000", {
    transports: ["websocket"]
  })
}))