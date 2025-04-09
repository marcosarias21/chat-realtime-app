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

const App = () => {
  const { user } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()
  const { socket } = useSocketState()
  const { setChatAvailable } = useChatStore()

  useEffect(() => {
    if (!user) {
      navigate('')
    }
    socket.emit('user_logged', user?._id)
    socket.on('chat_available', (chats: ChatRoomType[]) => {
      if (chats) {
        const chatsFiltered = chats.map((chat) => ({
          ...chat,
          users: chat.users.find((c) => c.username != user?.username),
        }))
        setChatAvailable(chatsFiltered)
      }
    })
  }, [socket, user, location.pathname])

  return (
    <div className="flex">
      {location.pathname !== '/' && <Sidebar />}
      <Routes>
        <Route path={''} element={<Login />} />
        <Route path={'/app/chat'} element={<Chat />} />
        <Route path={'/app/chat/:id'} element={<Room />} />
      </Routes>
    </div>
  )
}

export default App
