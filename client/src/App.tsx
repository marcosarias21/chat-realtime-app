import { io } from 'socket.io-client'
import './App.css'
import { useEffect } from 'react'

const socket = io("http://localhost:3000")

const App = () => {

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado al servidor con ID:", socket.id);
    });

    return () => {
      socket.off("connect"); // Cleanup para evitar múltiples listeners
    };
  }, [])
  
  return (
    <section>
      Chat
    </section>
  )
}

export default App
