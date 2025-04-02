import { RoomComponent } from '@/components/RoomComponent'
import { useSocketState } from '@/store/socketStore'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Room = () => {
  const { socket } = useSocketState()
  const { id } = useParams()
  console.log(id)
  useEffect(() => {
    socket.emit('joinRoom', id)
    socket.on('room_created', (data) => {
      console.log(data)
    })
  }, [])
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-2">
      <h2>Room w/user</h2>
      <RoomComponent />
    </div>
  )
}

export default Room
