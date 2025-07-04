import { useChatStore } from '@/store/chatStore'
import { useSocketState } from '@/store/socketStore'
import { ChatRoomType, User } from '@/types/types.d'
import { useEffect } from 'react'

const useSocketHandler = (user: User | null) => {
  const { socket } = useSocketState()
  const { setUsersOnline } = useChatStore()

  const { setChatAvailable } = useChatStore()

  useEffect(() => {
    socket.emit('user_logged', user?._id)
    socket.on('users_connected', (users) => {
      setUsersOnline(users)
    })

    socket.on('disconnect', () => {
      console.log('Desconectado')
    })

    socket.on('chat_available', (chats: ChatRoomType[]) => {
      if (chats) {
        const chatsFiltered = chats?.map((chat) => ({
          ...chat,
          users: chat.users.find((c) => c.username != user?.username),
        }))
        setChatAvailable(chatsFiltered)
      }
    })
    return () => {
      socket.off('user_logged')
      socket.off('users_connected')
      socket.off('chat_available')
    }
  }, [socket, user, location.pathname])
}

export default useSocketHandler
