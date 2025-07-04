import {
  CHAT_DELETED,
  CHAT_REQUEST_ALREADY_EXIST,
} from '@/constants/chat/chat-messages'
import { ChatRoomFiltered, User } from '@/types/types.d'
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
export const handleRequest = (
  chatAvailable: ChatRoomFiltered[],
  userToRequest: any,
  setUserReceiver: (arg: string) => void,
  setOpen: (arg: boolean) => void,
  user: User | null,
) => {
  const isChatExisting = chatAvailable.some(
    (chat) => chat.users?._id === userToRequest._id,
  )
  setUserReceiver(userToRequest._id)
  if (isChatExisting) {
    alert(CHAT_REQUEST_ALREADY_EXIST)
  } else {
    setOpen(true)
  }
  if (userToRequest._id === user?._id) setOpen(false)
}

export const deleteChat = (socket: Socket, idRoom: string | undefined) => {
  socket.emit('delete_chat', idRoom)
  alert(CHAT_DELETED)
  window.location.href = '/app/chat'
}
