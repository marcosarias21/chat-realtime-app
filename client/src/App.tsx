import { Route, Routes, useNavigate } from "react-router-dom"
import { Login } from "./pages/Login"
import { Chat } from "./pages/Chat"
import './App.css'
import { useEffect } from "react"
import { useAuthStore } from "./store/authStore"


const App = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('')
  }, [])
  return (
    <Routes>
      <Route path={''} element={<Login />} />
      <Route path={'/app/chat'} element={<Chat />} />
    </Routes>    
  )
}

export default App
