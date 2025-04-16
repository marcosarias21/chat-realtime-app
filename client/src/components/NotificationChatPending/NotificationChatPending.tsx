import { useSocketState } from '@/store/socketStore'
import { Button } from '../ui/button'
import { ChatPending } from '@/types/types.d'

type Prop = {
  chatPending: ChatPending
}

const NotificationChatPending: React.FC<Prop> = ({ chatPending }) => {
  const { socket } = useSocketState()
  console.log(chatPending._id)

  const acceptChat = (chatPending: ChatPending) => {
    console.log(chatPending)
    socket.emit(
      'chat_accepted',
      chatPending._id,
      chatPending.sender._id,
      chatPending.receiver,
    )
  }

  const denyChat = (chatPending: ChatPending) => {
    socket.emit('chat_dennied', chatPending._id, chatPending.sender)
  }

  return (
    <div>
      <p>
        Invitacion de:
        <span className="font-bold"> {chatPending?.sender.username}</span> para
        chatear
      </p>
      <div className="flex gap-2">
        <Button
          onClick={() => acceptChat(chatPending)}
          className="bg-green-400 text-white"
        >
          Aceptar
        </Button>
        <Button
          onClick={() => denyChat(chatPending)}
          className="bg-red-400 text-white"
        >
          Rechazar
        </Button>
      </div>
    </div>
  )
}

export default NotificationChatPending
