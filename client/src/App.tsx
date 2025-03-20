import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { Chat } from './components/Chat'
import './App.css'
import { MessageChat } from './types/types.d'

const socket = io("http://localhost:3000")

const App = () => {
  const [messageChat, setMessageChat] = useState<MessageChat[]>([])
  console.log(messageChat)
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conected to server w/ ID:", socket.id)
    });

    socket.on("chat_message", (message) => {
      setMessageChat(messageChat => [...messageChat, message])
    });

    return () => {
      socket.off("connect")
      socket.off("chat_message")
    };
  }, [])
  
  return (
    <section className='h-dvh flex flex-col justify-center items-center w-full gap-4 text-gray-700'>
      <div>
        <h1 className='text-2xl font-bold'>General Chat</h1>
      </div>
      <div className='h-100 w-100'>
        <Chat socket={socket} messageChat={messageChat}/>
      </div>
    </section>
  )
}

export default App
