import { useEffect, useState } from 'react'
import { ChatPending, MessageChatGeneral } from '../../types/types.d'
import { ChatComponent } from '../../components/ChatComponent'
import { useSocketState } from '../../store/socketStore'
import { useAuthStore } from '../../store/authStore'
import { ToastContainer, toast } from 'react-toastify'
import { NotificationChatPending } from '@/components/NotificationChatPending'

const Chat = () => {
  const [messageChat, setMessageChat] = useState<MessageChatGeneral[]>([])
  const [chatPending, setChatPending] = useState<ChatPending>()
  const { socket } = useSocketState()
  const { user } = useAuthStore()

  useEffect(() => {
    socket.emit('user_logged', user?._id)
    socket.on('notification', (data) => {
      setChatPending(data)
    })

    socket.emit('chat_users', user?._id)

    socket.on('chat_message', (data) => {
      setMessageChat(data)
    })
    socket.on('chat_dennieds', (data) => {
      alert(data)
    })

    return () => {
      socket.off('chat_message')
      socket.off('chat_dennieds')
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
    <section className="container mx-auto flex h-full w-full items-center justify-center gap-4 text-gray-700">
      <div className="flex h-[100%] w-full flex-col justify-center">
        <ChatComponent messageChat={messageChat} />
      </div>
      {chatPending && <ToastContainer />}
    </section>
  )
}

export default Chat
