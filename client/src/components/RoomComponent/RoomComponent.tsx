import { useAuthStore } from '@/store/authStore'
import { useChatStore } from '@/store/chatStore'
import { useSocketState } from '@/store/socketStore'
import { ChatRoomType, MessageChat, UserChat } from '@/types/types.d'
import { Image, Send, Trash, User } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import {
  deleteChat,
  handleSendMessage,
} from '@/services/message/useMessageActions'

type Prop = {
  contentChat?: MessageChat[]
  idRoom?: ChatRoomType['_id']
  userContact: UserChat
}

const RoomComponent: React.FC<Prop> = ({
  contentChat,
  idRoom,
  userContact,
}) => {
  const [inputValue, setInputValue] = useState<string>('')
  const { socket } = useSocketState()
  const [imageFile, setImageFile] = useState<File | null>(null)
  const { usersOnline } = useChatStore()
  const { user } = useAuthStore()

  const handleMessage = () => {
    handleSendMessage(socket, imageFile, idRoom, inputValue, user, setImageFile)
  }

  const handleDeleteChat = () => {
    deleteChat(socket, idRoom)
  }

  return (
    <div className="flex h-[100%] w-full flex-col items-center justify-between rounded">
      <div className="flex w-full justify-between gap-2 border-b-1 border-white/25 px-5 pt-5 pb-4">
        <div className="flex gap-2 font-bold text-gray-700">
          <span className="flex w-fit items-center rounded-full border-1 border-black/10 px-2 text-black/40">
            <User />
          </span>
          <div className="flex flex-col items-center">
            <div>
              <p className="font-bold">{userContact?.username}</p>
              {Object.keys(usersOnline)?.includes(userContact?._id) ? (
                <p>
                  Status:{' '}
                  <span className="font-bold text-green-600">Online</span>
                </p>
              ) : (
                <p>
                  Status:{' '}
                  <span className="font-bold text-red-500">Offline</span>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <Button className="bg-red-500 text-white" onClick={handleDeleteChat}>
            <Trash /> Delete chat
          </Button>
        </div>
      </div>
      <div className="custom-scrollbar mr-5 h-full w-full overflow-y-scroll p-5">
        {contentChat?.map((content, index) => (
          <div
            className={`mb-1 flex ${content?.sender.username != user?.username && 'justify-end text-gray-700'}`}
            key={index}
          >
            <div
              className={`bg-gradient-to-br from-[#9066EB] via-[#A970F7] to-[#B749FF] px-5 py-3 font-medium shadow ${content?.sender?.username !== user?.username ? 'flex flex-col rounded-t-2xl rounded-l-2xl bg-gray-300 text-gray-700' : 'rounded-t-2xl rounded-r-2xl text-white/90'} ${content?.buffer && 'bg-white'}`}
            >
              <p>{content.text}</p>
              {content.buffer && (
                <img
                  src={content.buffer}
                  className="max-h-64 max-w-xs rounded-lg"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mb-2 flex w-full rounded px-2 pt-4">
        <input
          className="block w-full rounded-2xl border-1 border-black/10 px-4 py-3 text-sm font-medium text-gray-700 shadow focus:border-violet-400 focus:ring-1 focus:ring-violet-400 focus:outline-none"
          type="text"
          placeholder="Enter message"
          onChange={({ target }) => setInputValue(target.value)}
          value={inputValue}
        />
        <div>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={({ target }) => setImageFile(target.files?.[0] ?? null)}
          />
          <label
            htmlFor="file-upload"
            className="inline-block cursor-pointer rounded-2xl px-2 py-2 text-sm font-semibold text-white transition-colors"
          >
            <Image />
          </label>
        </div>
        <button onClick={handleMessage} className="px-2 text-violet-500">
          <Send />
        </button>
      </div>
    </div>
  )
}

export default RoomComponent
