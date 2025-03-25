import { useEffect, useState } from 'react'
import { MessageChat } from '../../types/types.d'
import { ChatComponent } from '../../components/ChatComponent'
import { useSocketState } from '../../store/socketStore'

const Chat = () => {
  const [messageChat, setMessageChat] = useState<MessageChat[]>([])
  const { socket } = useSocketState()
  
  useEffect(() => {     
    socket.on("notification", (data) => {
    console.log("Notificación recibida:", data);
    });

    socket.on("chat_message", (data) => {
    console.log(data)
    setMessageChat(data)
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
        <ChatComponent messageChat={messageChat}/>
      </div>
    </section>
  )
}

export default Chat
