import { User } from '@/types/types.d'
import { Socket } from 'socket.io-client'

export const sendMessage = (
  socket: Socket,
  user: User | null,
  message: string,
  setMessage: (msg: string) => void,
) => {
  socket.emit('chat_message', message, user?._id)
  setMessage('')
}
