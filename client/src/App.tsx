import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Chat } from './pages/Chat'
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'
import { Room } from './pages/Room'
import { Sidebar } from './components/Sidebar'
import { Navbar } from './components/Navbar'
import './App.css'
import useSocketHandler from './hooks/useSocketHandler'

const App = () => {
  const { user } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('')
    }
  }, [])

  useSocketHandler(user)

  return (
    <div className="h-dvh">
      {location.pathname !== '/' && <Navbar />}
      <div className="mx-4 my-2 flex h-[90%] border-0 border-gray-300 shadow">
        {location.pathname !== '/' && (
          <div className="w-90 border-r-1 border-white/20">
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
