import { useEffect, useState } from 'react'
import { ChatPending, ChatRoomType, MessageChat } from '../../types/types.d'
import { ChatComponent } from '../../components/ChatComponent'
import { useSocketState } from '../../store/socketStore'
import { useAuthStore } from '../../store/authStore'
import { ToastContainer, toast } from 'react-toastify'
import { NotificationChatPending } from '@/components/NotificationChatPending'

const Chat = () => {
  const [messageChat, setMessageChat] = useState<MessageChat[]>([])
  const [chatPending, setChatPending] = useState<ChatPending>()
  const [chatsRoom, setChatsRoom] = useState<ChatRoomType[]>([])
  const { socket } = useSocketState()
  const { user } = useAuthStore()

  useEffect(() => {
    socket.emit('user_logged', user?._id)
    socket.on('chat_available', (chats) => {
      setChatsRoom(chats)
    })

    socket.on('notification', (data) => {
      setChatPending(data)
    })

    socket.emit('chat_users', user?._id)

    socket.on('chat_message', (data) => {
      setMessageChat(data)
    })

    return () => {
      socket.off('chat_message')
      socket.off('notification')
      socket.off('notify_chat_accepted')
    }
  }, [socket, user])

  useEffect(() => {
    if (chatPending?.status === 'pending') {
      toast.info(<NotificationChatPending chatPending={chatPending} />)
    }
  }, [chatPending])

  return (
    <section className="grid-row-12 container mx-auto grid h-dvh w-full gap-4 text-gray-700">
      <div className="row-span-11 flex justify-center">
        <div className="flex flex-col items-center">
          <div className="flex h-full w-full justify-center gap-4">
            <div className="w-full">
              <ChatComponent messageChat={messageChat} />
            </div>
            {chatPending && <ToastContainer />}
          </div>
          <div className="flex w-full justify-center text-red-50"></div>
        </div>
      </div>
      <footer className="row-span-1 flex items-center justify-center font-bold text-gray-700">
        @Marcos Arias 2025
      </footer>
    </section>
  )
}

export default Chat
