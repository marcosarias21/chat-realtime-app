import { Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Chat } from "./pages/Chat"
import './App.css'


const App = () => {

  return (
    <Routes>
      <Route path={''} element={<Login />} />
      <Route path={'/app/chat'} element={<Chat />} />
    </Routes>    
  )
}

export default App
