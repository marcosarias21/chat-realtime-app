import { ChatPending } from "../../types/types.d";

type Prop = ChatPending;

const ChatRequest: React.FC<Prop> = ({ sender }) => {
  console.log(sender);
  return (
    <div className="flex gap-2 border-1 border-black/30 p-3">
      <div>
        <p>{sender.username}</p>
      </div>
      <div></div>
    </div>
  );
};

export default ChatRequest;
