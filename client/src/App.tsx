import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Chat } from './pages/Chat'
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'
import { Room } from './pages/Room'
import { Sidebar } from './components/Sidebar'
import { useSocketState } from './store/socketStore'
import { ChatRoomType } from './types/types.d'
import { useChatStore } from './store/chatStore'
import './App.css'
import { Navbar } from './components/Navbar'

const App = () => {
  const { user } = useAuthStore()
  const location = useLocation()
  const { setUsersOnline } = useChatStore()
  const navigate = useNavigate()
  const { socket } = useSocketState()
  const { setChatAvailable } = useChatStore()

  useEffect(() => {
    if (!user) {
      navigate('')
    }
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

  return (
    <div className="h-dvh">
      {location.pathname !== '/' && <Navbar />}
      <div className="mx-4 my-2 flex h-[90%] border-2 border-gray-300 shadow">
        {location.pathname !== '/' && (
          <div className="w-90 border-r-1 border-gray-300">
            <Sidebar />
          </div>
        )}
        <Routes>
          <Route path={''} element={<Login />} />
          <Route path={'/app/chat'} element={<Chat />} />
          <Route path={'/app/chat/:id'} element={<Room />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
