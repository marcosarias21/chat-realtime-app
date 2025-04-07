import { RoomComponent } from '@/components/RoomComponent'
import { useAuthStore } from '@/store/authStore'
import { useSocketState } from '@/store/socketStore'
import { ChatRoomActual, UserChat } from '@/types/types.d'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Room = () => {
  const { socket } = useSocketState()
  const { id } = useParams()
  const { user } = useAuthStore()
  const [roomData, setRoomData] = useState<ChatRoomActual>()
  const userFiltered: UserChat[] | undefined = roomData?.users?.filter(
    (u) => u.username != user?.username,
  )

  useEffect(() => {
    socket.emit('joinRoom', id)
    socket.on('room_created', (data) => {
      setRoomData(data)
    })
    return () => {
      socket.off('room_created')
    }
  }, [socket, id])

  return (
    <div className="container mx-auto flex h-dvh w-full flex-col items-center justify-center gap-2">
      <h2>Chat w/ {userFiltered && userFiltered[0].username}</h2>
      <RoomComponent contentChat={roomData?.message} />
    </div>
  )
}

export default Room
