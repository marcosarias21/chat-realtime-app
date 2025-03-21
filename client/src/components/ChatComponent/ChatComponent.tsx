import { useAuthStore } from "../../store/authStore"
import { useMessageStore } from "../../store/messageStore"
import { MessageChat } from "../../types/types.d"

interface Prop {
  socket: any
  messageChat: MessageChat[]
}

const Chat: React.FC<Prop> = ({ socket, messageChat }) => {
  const { setMessage, message  } = useMessageStore()
  const { user } = useAuthStore()
  console.log(user)
  const sendMessage  = () => {
    socket.emit("chat_message", message, user?._id)
    setMessage("")
  }
  
  const createChatRequest = (userReceiver: string) => {
    console.log(userReceiver)
    socket.emit("chat_request", { sender: socket.id, receiver: userReceiver })
  }

  return (
    <div className="min-h-[100%] border-1 h-full border-gray-300 flex flex-col items-center justify-between rounded">
      <div className="w-full p-2 overflow-y-scroll">
        {messageChat?.map((chat, index) => 
        <div className={`flex mb-1 ${chat.username != socket.id && "justify-end text-gray-700" }`} key={index}>
          <div className={`bg-blue-500 font-medium py-3 px-3  flex ${chat.username != socket.id ? 'flex-row-reverse rounded-l-2xl rounded-t-2xl bg-gray-300 text-gray-700': "text-white/90 rounded-t-2xl rounded-r-2xl"}`}>
            <p onClick={() => createChatRequest(chat.username)}>{chat.username == socket.id ? "Me:" : `:${chat.username}`}</p>
            <p>{chat.message}</p>
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