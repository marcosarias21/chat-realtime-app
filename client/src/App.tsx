import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { Chat } from './pages/Chat'
import './App.css'
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'
import { Room } from './pages/Room'
import { Sidebar } from './components/Sidebar'

const App = () => {
  const { user } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('')
    } else {
      navigate('/app/chat')
    }
  }, [])

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
