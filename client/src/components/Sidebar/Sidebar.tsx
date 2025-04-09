import { useAuthStore } from '@/store/authStore'
import { useLocation, useNavigate } from 'react-router-dom'
import { User, MessageCircle } from 'lucide-react'
import { useChatStore } from '@/store/chatStore'
import { useState } from 'react'

const Sidebar = () => {
  const { user } = useAuthStore()
  const { chatAvailable } = useChatStore()
  const [idPath, setIdPath] = useState<string>()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleRoom = (id: string) => {
    setIdPath(id)
    navigate(`/app/chat/${id}`)
  }

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
        <div
          className={`flex cursor-pointer items-center rounded-2xl border-1 border-gray-300 py-2 ${pathname === '/app/chat' && 'border-none bg-blue-400 text-gray-100 shadow-lg shadow-black/30'}`}
          onClick={() => (window.location.href = '/app/chat')}
        >
          <span className="border- rounded-full border-gray-400 p-1">
            <MessageCircle />
          </span>
          <div>
            <h2 className="font-bold">General Chat</h2>
          </div>
        </div>
        <div
          className={`flex items-center gap-2 rounded-2xl border-1 border-b-1 border-gray-300 py-2 ${pathname === `/app/chat/${idPath}` && 'border-none bg-blue-400 text-gray-100 shadow-lg shadow-black/30'}`}
        >
          {chatAvailable.map((chat) => (
            <div
              className="flex cursor-pointer items-center"
              onClick={() => handleRoom(chat._id)}
            >
              <span className="rounded-full p-1">
                <User />
              </span>
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
