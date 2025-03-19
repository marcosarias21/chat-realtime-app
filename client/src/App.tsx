import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { Chat } from './components/Chat'
import './App.css'

const socket = io("http://localhost:3000")

const App = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conected to server w/ ID:", socket.id)
    });

    socket.on("chat_message", (data) => {
      console.log("Message:", data)
    });

    return () => {
      socket.off("connect")
    };
  }, [])
  
  return (
    <section className='h-dvh flex flex-col justify-center items-center w-full gap-4 text-gray-700'>
      <div>
        <h1 className='text-2xl font-bold'>Talking</h1>
      </div>
      <div className='h-100 w-100'>
        <Chat />
      </div>
    </section>
  )
}

export default App
