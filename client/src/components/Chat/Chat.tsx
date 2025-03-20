import { useMessageStore } from "../../store/messageStore"
import { MessageChat } from "../../types/types.d"

interface Prop {
  socket: any
  messageChat: MessageChat[]
}

const Chat: React.FC<Prop> = ({ socket, messageChat }) => {
  console.log(messageChat)
  const { setMessage, message  } = useMessageStore()
  const sendMessage  = () => {
    socket.emit("chat_message", message, socket.id)
    setMessage("")
  }

  return (
    <div className="border-1 h-full border-gray-300 flex flex-col items-center justify-between rounded">
      <div className="w-full p-2">
        {messageChat?.map((message, index) => 
        <div className={`flex mb-1 ${message.user != socket.id && "justify-end text-gray-700" }`} key={index}>
          <div className={`bg-blue-500 font-medium py-3 px-3  flex ${message.user != socket.id ? 'flex-row-reverse rounded-l-2xl rounded-t-2xl bg-gray-300 text-gray-700': "text-white/90 rounded-t-2xl rounded-r-2xl"}`}>
            <p>{message.user == socket.id ? "Me:" : `:${message.user}`}</p>
            <p>{message.content}</p>
          </div>
        </div>
        )}
      </div>
      <div className="w-full flex">
        <input className="font-medium border-gray-400 py-3 px-4 block w-full border text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none dark:text-white dark:placeholder-gray-400" type="text" placeholder="Enter message" onChange={({ target }) => setMessage(target.value)} value={message} />
        <button onClick={sendMessage} className="text-white px-2 bg-blue-400">Enviar</button>
      </div>
    </div>
  )
}

export default Chat