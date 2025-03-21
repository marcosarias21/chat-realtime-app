import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import './App.css'
import { MessageChat } from '../../types/types.d'
import { ChatComponent } from '../../components/ChatComponent'

const socket = io("http://localhost:3000")
const Chat = () => {
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
        <ChatComponent socket={socket} messageChat={messageChat}/>
      </div>
    </section>
  )
}

export default Chat
