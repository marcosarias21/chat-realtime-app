import { RoomComponent } from '@/components/RoomComponent'
import { useAuthStore } from '@/store/authStore'
import { useSocketState } from '@/store/socketStore'
import { ChatRoomActual } from '@/types/types.d'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const Room = () => {
  const { socket } = useSocketState()
  const location = useLocation()
  const { id } = useParams()
  const { user } = useAuthStore()
  const [roomData, setRoomData] = useState<ChatRoomActual>()
  const userFiltered: any[] | undefined = roomData?.users?.filter(
    (u) => u.username != user?.username,
  )

  useEffect(() => {
    socket.emit('joinRoom', id)
    socket.on('room_created', (data) => {
      setRoomData(data)
    })
    socket.on('new_message', (data) => {
      setRoomData(data)
    })

    return () => {
      socket.off('room_created')
      socket.off('new_message')
    }
  }, [socket, id, location.pathname])

  return (
    <div className="container mx-auto flex h-dvh w-full flex-col items-center justify-center text-gray-700">
      <h2 className="text-center font-medium">
        Chat w/ {userFiltered && userFiltered[0].username}
      </h2>
      <RoomComponent contentChat={roomData?.message} idRoom={roomData?._id} />
    </div>
  )
}

export default Room
