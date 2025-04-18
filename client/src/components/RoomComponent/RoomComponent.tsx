import { useAuthStore } from '@/store/authStore'
import { useChatStore } from '@/store/chatStore'
import { useSocketState } from '@/store/socketStore'
import { ChatRoomType, MessageChat, UserChat } from '@/types/types.d'
import { Send, Trash, User } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'

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

  const handleSendMessage = () => {
    if (imageFile === null) {
      socket.emit('send_message', {
        roomID: idRoom,
        text: inputValue,
        id_user: user?._id,
        filename: null,
        buffer: null,
      })
    } else {
      const reader = new FileReader()
      reader.onload = () => {
        const base64string = reader.result
        if (base64string) {
          socket.emit('send_message', {
            roomID: idRoom,
            text: inputValue,
            id_user: user?._id,
            filename: imageFile.name,
            buffer: base64string,
          })
          setImageFile(null)
        }
      }
      reader.readAsDataURL(imageFile)
    }
  }

  const handleDeleteChat = () => {
    socket.emit('delete_chat', idRoom)
    alert('Chat deleted')
    window.location.href = '/app/chat'
  }

  return (
    <div className="flex h-[100%] w-full flex-col items-center justify-between rounded border-gray-300">
      <div className="flex w-full justify-between gap-2 border-b-1 border-gray-300 px-2 py-4">
        <div className="flex gap-2">
          <span className="flex w-fit items-center rounded-full border-2 p-2 text-gray-400">
            <User />
          </span>
          <div className="flex flex-col items-center">
            <div>
              <p className="font-bold">{userContact?.username}</p>
              <p>
                Status:{' '}
                <span
                  className={`${Object.keys(usersOnline)?.includes(userContact?._id) && 'font-bold text-green-400'}`}
                >
                  Online
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <Button className="bg-red-500 text-white" onClick={handleDeleteChat}>
            <Trash /> Delete chat
          </Button>
        </div>
      </div>
      <div className="h-full w-full overflow-y-scroll p-2">
        {contentChat?.map((content, index) => (
          <div
            className={`mb-1 flex ${content?.sender.username != user?.username && 'justify-end text-gray-700'}`}
            key={index}
          >
            <div
              className={`flex flex-col bg-blue-500 px-3 py-3 font-medium ${content?.sender?.username !== user?.username ? 'flex flex-col rounded-t-2xl rounded-l-2xl bg-gray-300 text-gray-700' : 'rounded-t-2xl rounded-r-2xl text-white/90'} ${content?.buffer && 'bg-white'}`}
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
          className="block w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm font-medium focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
          type="text"
          placeholder="Enter message"
          onChange={({ target }) => setInputValue(target.value)}
          value={inputValue}
        />
        <input
          className="rounded-2xl border border-gray-300 px-4 py-3 text-sm font-medium focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none dark:text-white dark:placeholder-gray-400"
          type="file"
          onChange={({ target }) => setImageFile(target.files?.[0] ?? null)}
        />
        <button onClick={handleSendMessage} className="px-2 text-gray-400">
          <Send />
        </button>
      </div>
    </div>
  )
}

export default RoomComponent
