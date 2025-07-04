import { ChatPending } from '@/types/types.d'
import { Socket } from 'socket.io-client'

export const acceptChatNotification = (
  socket: Socket,
  chatPending: ChatPending,
) => {
  socket.emit(
    'chat_accepted',
    chatPending._id,
    chatPending.sender._id,
    chatPending.receiver,
  )
}

export const denyChatNotification = (
  socket: Socket,
  chatPending: ChatPending,
) => {
  socket.emit('chat_dennied', chatPending._id, chatPending.sender)
}
