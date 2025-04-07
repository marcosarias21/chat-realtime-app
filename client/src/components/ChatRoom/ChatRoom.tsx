import { useAuthStore } from '@/store/authStore'
import { ChatRoomType } from '@/types/types.d'
import React from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

type Prop = ChatRoomType

const ChatRoom: React.FC<Prop> = ({ users, _id }) => {
  console.log(_id)
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const usersFiltered = users.filter((u) => u.username != user?.username)

  const handleRoom = () => {
    navigate(`/app/chat/${_id}`)
  }

  return (
    <div>
      {usersFiltered.map((u) => (
        <Button onClick={handleRoom} variant={'outline'}>
          {u.username}
        </Button>
      ))}
    </div>
  )
}

export default ChatRoom
