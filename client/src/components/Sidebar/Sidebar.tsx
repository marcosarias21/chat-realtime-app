import { useAuthStore } from '@/store/authStore'
import { useSocketState } from '@/store/socketStore'
import { ChatRoomActual, ChatRoomType } from '@/types/types.d'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const { user } = useAuthStore()
  const { socket } = useSocketState()
  const navigate = useNavigate()
  const [chatsAvailable, setChatsAvailable] = useState<ChatRoomActual[]>([])

  const handleRoom = (id: string) => {
    navigate(`/app/chat/${id}`)
  }

  useEffect(() => {
    socket.on('chat_available', (chats: ChatRoomType[]) => {
      if (chats) {
        const chatsFiltered = chats.map((chat) => ({
          ...chat,
          users: chat.users.find((c) => c.username != user?.username),
        }))
        console.log(chatsFiltered)
        setChatsAvailable(chatsFiltered)
      }
    })
  }, [])

  return (
    <header className="justif flex w-80 flex-col border-r-1 border-gray-300 text-gray-600">
      <div className="mt-10 mb-10 flex w-full items-center gap-2 pl-10">
        <span className="rounded-full border-0 border-gray-400 bg-green-300 p-5"></span>
        <div>
          <h2 className="font-bold">{user?.username}</h2>
          <p className="text-sm">My account</p>
        </div>
      </div>
      <hr className="border-gray-300" />
      <div className="mt-5 flex flex-col gap-5 px-10">
        <h2 className="font-medium text-blue-400">Chats</h2>
        <div className="flex items-center gap-2 border-b-1 border-gray-300 pb-2">
          <span className="rounded-full border-1 border-gray-400 p-5"></span>
          <div>
            <h2 className="font-bold">General Chat</h2>
          </div>
        </div>
        <div className="flex items-center gap-2 border-b-1 border-gray-300 pb-2">
          {chatsAvailable.map((chat) => (
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={() => handleRoom(chat._id)}
            >
              <span className="rounded-full border-1 border-gray-400 p-5"></span>
              <div>
                <h2 className="font-bold">{chat.users?.username}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Sidebar
