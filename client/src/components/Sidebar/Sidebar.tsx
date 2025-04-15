import { useAuthStore } from '@/store/authStore'
import { useLocation, useNavigate } from 'react-router-dom'
import { User, MessageCircle, Users } from 'lucide-react'
import { useChatStore } from '@/store/chatStore'
import { useState } from 'react'

const Sidebar = () => {
  const { user } = useAuthStore()
  const { chatAvailable, usersOnline } = useChatStore()
  const [idPath, setIdPath] = useState<string>()
  const { pathname } = useLocation()
  const userOnlineKey = Object.keys(usersOnline)
  const navigate = useNavigate()

  const handleRoom = (id: string) => {
    setIdPath(id)
    navigate(`/app/chat/${id}`)
  }

  return (
    <header className="flex w-full flex-col text-gray-700">
      <div className="mt-10 mb-10 flex w-full items-center gap-2 pl-10">
        <span className="rounded-full border-0 border-gray-400 bg-green-300 p-5"></span>
        <div>
          <h2 className="font-bold">{user?.username}</h2>
          <p className="text-sm">My account</p>
        </div>
      </div>
      <hr className="border-gray-300" />
      <div className="mt-2 flex flex-col">
        <div className="my-4 flex items-center">
          <span className="ml-4">
            <Users />
          </span>
          <h2 className="ml-1 text-xl font-medium text-gray-600">Chats</h2>
        </div>
        <div
          className={`flex cursor-pointer items-center py-2 transition-colors hover:bg-blue-300 hover:text-white ${pathname === '/app/chat' && 'border-none bg-blue-400 text-gray-100'}`}
          onClick={() => (window.location.href = '/app/chat')}
        >
          <span className="mx-2 rounded-full border-1 p-1">
            <MessageCircle />
          </span>
          <div>
            <h2 className="font-bold">General Chat</h2>
          </div>
        </div>
        <div
          className={`flex w-full items-center gap-2 py-2 transition-colors hover:bg-blue-300 hover:text-white ${pathname === `/app/chat/${idPath}` && 'border-none bg-blue-400 text-gray-100'}`}
        >
          {chatAvailable.map((chat) => (
            <div
              className="flex w-full cursor-pointer items-center"
              onClick={() => handleRoom(chat._id)}
            >
              <span className="mx-2 rounded-full border-1 p-1">
                <User />
              </span>
              <div>
                <h2 className="font-bold">{chat.users?.username}</h2>
                Status:
                {chat.users?._id && userOnlineKey.includes(chat.users?._id) ? (
                  <span className="font-semibold text-green-500"> Online</span>
                ) : (
                  <span className="font-semibold text-red-500"> Offline</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Sidebar
