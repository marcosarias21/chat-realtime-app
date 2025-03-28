import { useSocketState } from "@/store/socketStore";
import { Button } from "../ui/button";
import { ChatPending } from "@/types/types.d";
import { toast } from "react-toastify";

type Prop = {
  chatPending: ChatPending;
};

const NotificationChatPending: React.FC<Prop> = ({ chatPending }) => {
  const { socket } = useSocketState();
  console.log(chatPending._id);

  const acceptChat = (chatPeding: ChatPending) => {
    console.log(chatPeding);
    socket.emit(
      "chat_accepted",
      chatPeding._id,
      chatPeding.sender._id,
      chatPeding.receiver,
    );
    socket.on("notify_chat_accepted", (idRoom) => {
      console.log(idRoom);
      socket.emit("join_room", idRoom);
    });
  };

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
        <Button className="bg-red-400 text-white">Rechazar</Button>
      </div>
    </div>
  );
};

export default NotificationChatPending;
