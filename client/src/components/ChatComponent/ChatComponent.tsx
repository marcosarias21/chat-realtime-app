import { Button } from '@headlessui/react'
import { useAuthStore } from '../../store/authStore'
import { useMessageStore } from '../../store/messageStore'
import { MessageChatGeneral } from '../../types/types.d'
import { ModalRequestUser } from '../ModalRequestUser'
import { Send } from 'lucide-react'

interface Prop {
  messageChat: MessageChatGeneral[]
  handleSendMessage: () => void
  handleRequestChat: (arg: any) => void
}

const ChatComponent: React.FC<Prop> = ({
  messageChat,
  handleSendMessage,
  handleRequestChat,
}) => {
  const { message, setMessage } = useMessageStore()
  const { user } = useAuthStore()

  return (
    <div className="flex h-[100%] flex-col items-center justify-between rounded">
      <div className="custom-scrollbar mr-5 h-full w-full overflow-y-scroll p-5">
        {messageChat?.map((chat, index) => (
          <div
            className={`mb-1 flex ${chat?.user?.username != user?.username && 'justify-end text-gray-700'}`}
            key={index}
          >
            <div
              className={`flex flex-col px-5 py-3 font-medium ${chat?.user?.username !== user?.username ? 'flex flex-col rounded-t-2xl rounded-l-2xl bg-gray-300 text-gray-700' : 'rounded-t-2xl rounded-r-2xl bg-gradient-to-br from-[#9066EB] via-[#A970F7] to-[#B749FF] text-white/90'}`}
            >
              <Button
                className="text-xs font-bold"
                onClick={() => handleRequestChat(chat.user)}
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
          className="block w-full rounded-2xl border-1 border-black/10 px-4 py-3 text-sm font-medium text-gray-700 shadow focus:border-violet-400 focus:ring-1 focus:ring-violet-400 focus:outline-none"
          type="text"
          placeholder="Enter message"
          onChange={({ target }) => setMessage(target.value)}
          value={message}
        />
        <button onClick={handleSendMessage} className="px-2 text-violet-500">
          <Send />
        </button>
      </div>
    </div>
  )
}

export default ChatComponent
