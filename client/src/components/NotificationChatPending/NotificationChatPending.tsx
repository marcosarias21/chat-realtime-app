import { useSocketState } from '@/store/socketStore'
import { Button } from '../ui/button'
import { ChatPending } from '@/types/types.d'
import {
  acceptChatNotification,
  denyChatNotification,
} from '@/services/notifications/useNotifications'

type Prop = {
  chatPending: ChatPending
}

const NotificationChatPending: React.FC<Prop> = ({ chatPending }) => {
  const { socket } = useSocketState()

  const acceptChat = (chatPending: ChatPending) => {
    acceptChatNotification(socket, chatPending)
  }

  const denyChat = (chatPending: ChatPending) => {
    denyChatNotification(socket, chatPending)
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
