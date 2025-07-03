import { RoomComponent } from '@/components/RoomComponent'
import useSocketRoom from '@/hooks/useSocketRoom'

const Room = () => {
  const { roomData, userFiltered } = useSocketRoom()

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
