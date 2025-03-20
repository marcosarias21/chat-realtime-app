import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { Chat } from './components/Chat'
import './App.css'
import { MessageChat } from './types/types.d'

const socket = io("http://localhost:3000")

const App = () => {
  const [messageChat, setMessageChat] = useState<MessageChat[]>([])

  useEffect(() => {
    socket.on("notification", (data) => {
      console.log("Notificación recibida:", data);
    });
    
    socket.on("chat_message", (messages) => {
      setMessageChat(messages)
    });
    
  
    return () => {
      socket.off("chat_message");
      socket.off("notification");
    }
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
