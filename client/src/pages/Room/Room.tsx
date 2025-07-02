import { RoomComponent } from '@/components/RoomComponent'
import { useAuthStore } from '@/store/authStore'
import { useSocketState } from '@/store/socketStore'
import { ChatRoomActual } from '@/types/types.d'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const Room = () => {
  const { socket } = useSocketState()
  const location = useLocation()
  const { user } = useAuthStore()
  const { id } = useParams()
  const [roomData, setRoomData] = useState<ChatRoomActual>()
  const userFiltered: any = roomData?.users?.find(
    (u) => u?.username !== user?.username,
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
    <div className="container mx-auto flex h-full w-full items-center justify-center gap-4 text-gray-700 backdrop-blur-md">
      <div className="flex h-[100%] w-full flex-col justify-center">
        <RoomComponent
          contentChat={roomData?.message}
          idRoom={roomData?._id}
          userContact={userFiltered}
        />
      </div>
    </div>
  )
}

export default Room
