import { useAuthStore } from '@/store/authStore'
import { useSocketState } from '@/store/socketStore'
import { ChatRoomActual } from '@/types/types.d'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const useSocketRoom = () => {
  const { socket } = useSocketState()
  const location = useLocation()
  const { user } = useAuthStore()
  const { id } = useParams()
  const [roomData, setRoomData] = useState<ChatRoomActual>()
  const [userFiltered, setUserFiltered] = useState<any>()
  console.log(userFiltered)

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
    }
  }, [socket, id, location.pathname])

  useEffect(() => {
    setUserFiltered(
      roomData?.users?.find((u) => u?.username !== user?.username),
    )
  }, [roomData])

  return { roomData, userFiltered }
}

export default useSocketRoom
