import { useAuthStore } from '@/store/authStore'
import { useSocketState } from '@/store/socketStore'
import { ChatRoomType, MessageChat } from '@/types/types.d'
import { Send } from 'lucide-react'
import { useState } from 'react'

type Prop = {
  contentChat?: MessageChat[]
  idRoom?: ChatRoomType['_id']
}

const RoomComponent: React.FC<Prop> = ({ contentChat, idRoom }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const { socket } = useSocketState()
  const { user } = useAuthStore()

  const handleSendMessage = () => {
    socket.emit('send_message', {
      roomID: idRoom,
      text: inputValue,
      id_user: user?._id,
    })
  }

  return (
    <div className="flex h-[100%] w-full flex-col items-center justify-between rounded border-gray-300">
      <div className="h-full w-full overflow-y-scroll p-2">
        {contentChat?.map((content, index) => (
          <div
            className={`mb-1 flex ${content?.sender.username != user?.username && 'justify-end text-gray-700'}`}
            key={index}
          >
            <div
              className={`flex flex-col bg-blue-500 px-3 py-3 font-medium ${content?.sender?.username !== user?.username ? 'flex flex-col rounded-t-2xl rounded-l-2xl bg-gray-300 text-gray-700' : 'rounded-t-2xl rounded-r-2xl text-white/90'}`}
            >
              <span className="text-xs">{content.sender.username}</span>
              <p>{content.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-2 flex w-full rounded px-5">
        <input
          className="block w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm font-medium focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
          type="text"
          placeholder="Enter message"
          onChange={({ target }) => setInputValue(target.value)}
          value={inputValue}
        />
        <button onClick={handleSendMessage} className="px-2 text-gray-400">
          <Send />
        </button>
      </div>
    </div>
  )
}

export default RoomComponent
