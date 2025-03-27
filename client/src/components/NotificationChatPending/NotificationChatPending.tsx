import { Button } from '../ui/button'

const NotificationChatPending = ({ chatPending }: any) => {
  console.log(chatPending)
  return (
      <div>
        <p>Invitacion de:<span className="font-bold"> {chatPending?.sender.username}</span> para chatear</p>
        <div className="flex gap-2">
          <Button className="bg-green-400 text-white">Aceptar</Button>
          <Button className="bg-red-400 text-white">Rechazar</Button>
        </div>
      </div>
  )
}

export default NotificationChatPending
