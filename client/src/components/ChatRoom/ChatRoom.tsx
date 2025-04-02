import { useAuthStore } from '@/store/authStore'
import { ChatRoomType } from '@/types/types.d'
import React from 'react'
import { Button } from '../ui/button'
import { useSocketState } from '@/store/socketStore'
import { useNavigate } from 'react-router-dom'

type Prop = ChatRoomType

const ChatRoom: React.FC<Prop> = ({ users }) => {
  console.log(users)
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const { socket } = useSocketState()
  const usersFiltered = users.filter((u) => u.username != user?.username)

  const handleRoom = (user: ChatRoomType) => {
    console.log(user)
    navigate(`/app/chat/${user._id}`)
  }

  return (
    <div>
      {usersFiltered.map((u) => (
        <Button onClick={() => handleRoom(u)} variant={'outline'}>
          {u.username}
        </Button>
      ))}
    </div>
  )
}

export default ChatRoom
