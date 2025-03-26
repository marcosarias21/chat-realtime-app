import { useEffect, useState } from "react";
import { ChatPending, MessageChat } from "../../types/types.d";
import { ChatComponent } from "../../components/ChatComponent";
import { useSocketState } from "../../store/socketStore";
import { useAuthStore } from "../../store/authStore";
import { ChatRequest } from "../../components/ChatRequest";

const Chat = () => {
  const [messageChat, setMessageChat] = useState<MessageChat[]>([]);
  const [chatPending, setChatPending] = useState<ChatPending>();
  console.log(chatPending);
  const { socket } = useSocketState();
  const { user } = useAuthStore();

  useEffect(() => {
    socket.emit("user_logged", user?._id);

    socket.on("notification", (data) => {
      setChatPending(data);
    });

    socket.on("chat_message", (data) => {
      setMessageChat(data);
    });

    return () => {
      socket.off("chat_message");
      socket.off("notification");
    };
  }, [socket, user]);

  return (
    <section className="grid-row-12 grid h-dvh w-full justify-center gap-4 text-gray-700">
      <div className="row-span-2">asda</div>
      <div className="row-span-10 flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">General Chat</h1>
        <div className="flex h-full w-full gap-2">
          <div className="h-full">
            <ChatComponent messageChat={messageChat} />
          </div>
          {chatPending && (
            <div>
              <h4 className="animate-pulse font-bold text-red-500">
                Chat pending to request
              </h4>
              <ChatRequest {...chatPending} />
            </div>
          )}
          <div className="flex w-full justify-center text-red-50"></div>
        </div>
      </div>
      <footer className="flex justify-center text-red-500">
        @Marcos Arias 2025
      </footer>
    </section>
  );
};

export default Chat;
