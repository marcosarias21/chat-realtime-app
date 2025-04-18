import { Button } from '@headlessui/react'
import { useAuthStore } from '../../store/authStore'
import { useMessageStore } from '../../store/messageStore'
import { useSocketState } from '../../store/socketStore'
import { MessageChatGeneral } from '../../types/types.d'
import { useModalStore } from '../../store/modalStore'
import { ModalRequestUser } from '../ModalRequestUser'
import { Send } from 'lucide-react'
import { useChatStore } from '@/store/chatStore'

interface Prop {
  messageChat: MessageChatGeneral[]
}

const ChatComponent: React.FC<Prop> = ({ messageChat }) => {
  const { setMessage, message } = useMessageStore()
  const { chatAvailable } = useChatStore()
  console.log(chatAvailable)
  const { setOpen, setUserReceiver, userReceiver } = useModalStore()
  const { socket } = useSocketState()
  const { user } = useAuthStore()

  const sendMessage = () => {
    socket.emit('chat_message', message, user?._id)
    setMessage('')
  }

  const handleRequest = (userToRequest: any) => {
    setUserReceiver(userToRequest._id)
    if (chatAvailable[0]?.users?._id === userReceiver) {
      alert('You already have a chat with this user')
    } else {
      setOpen(true)
    }
  }

  return (
    <div className="flex h-[100%] flex-col items-center justify-between rounded">
      <div className="h-full w-full overflow-y-scroll p-2">
        {messageChat?.map((chat, index) => (
          <div
            className={`mb-1 flex ${chat?.user?.username != user?.username && 'justify-end text-gray-700'}`}
            key={index}
          >
            <div
              className={`flex flex-col bg-blue-500 px-3 py-3 font-medium ${chat?.user?.username !== user?.username ? 'flex flex-col rounded-t-2xl rounded-l-2xl bg-gray-300 text-gray-700' : 'rounded-t-2xl rounded-r-2xl text-white/90'}`}
            >
              <Button
                className="text-xs font-bold"
                onClick={() => handleRequest(chat.user)}
              >
                {chat?.user?.username == user?.username
                  ? 'Me:'
                  : `${chat?.user?.username}`}
              </Button>
              <ModalRequestUser />
              <p>{chat.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-2 flex w-full rounded px-2 pt-4">
        <input
          className="block w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm font-medium focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
          type="text"
          placeholder="Enter message"
          onChange={({ target }) => setMessage(target.value)}
          value={message}
        />
        <button onClick={sendMessage} className="px-2 text-gray-400">
          <Send />
        </button>
      </div>
    </div>
  )
}

export default ChatComponent
