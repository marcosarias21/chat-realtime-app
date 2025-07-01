import { useAuthStore } from '@/store/authStore'
import { useLocation, useNavigate } from 'react-router-dom'
import { User, MessageCircle, Users, Menu } from 'lucide-react'
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
    <header className="flex h-full w-full flex-col text-gray-700">
      <div className="my-5 flex w-full items-center gap-2 pl-10">
        <span className="rounded-full border-0 border-gray-400 bg-green-300 p-5"></span>
        <div>
          <h2 className="font-bold">{user?.username}</h2>
          <p className="text-sm">My account</p>
        </div>
      </div>
      <hr className="border-gray-300" />
      <div className="flex h-full flex-col bg-[#FAFCFC] px-4">
        <div className="my-4 flex items-center">
          <span className="ml-4">
            <Users />
          </span>
          <h2 className="ml-1 text-2xl font-bold text-gray-800">Chats</h2>
        </div>
        <div
          className={`flex cursor-pointer items-center rounded px-2 py-2 shadow-md transition-colors hover:bg-black/75 hover:text-white ${pathname === '/app/chat' && 'border-none bg-[#303440] text-white'}`}
          onClick={() => (window.location.href = '/app/chat')}
        >
          <span className="mx-2 rounded-full p-1">
            <MessageCircle />
          </span>
          <div>
            <h2 className="font-bold">General Chat</h2>
          </div>
        </div>
        {chatAvailable.length > 0 && (
          <div
            className={`flex w-full items-center gap-2 py-2 transition-colors`}
          >
            {chatAvailable.map((chat) => (
              <div
                className={`flex w-full cursor-pointer items-center justify-between gap-1 rounded px-2 py-2 shadow-md hover:bg-black/75 hover:text-white ${pathname === `/app/chat/${idPath}` && 'border-none bg-[#303440] text-white'}`}
                onClick={() => handleRoom(chat._id)}
              >
                <div className="flex items-center gap-2">
                  <span className="mx-2 rounded-full border-1 p-1">
                    <User />
                  </span>
                  <div>
                    <h2 className="font-bold">{chat.users?.username}</h2>
                    <p className="text-sm">
                      Status:
                      {chat.users?._id &&
                      userOnlineKey.includes(chat.users?._id) ? (
                        <span className="font-semibold text-green-500">
                          {' '}
                          Online
                        </span>
                      ) : (
                        <span className="font-semibold text-red-500">
                          {' '}
                          Offline
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="self-start text-lg leading-none">
                  <Menu size={15} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

export default Sidebar
