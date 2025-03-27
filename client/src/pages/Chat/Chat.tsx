import { useEffect, useState } from "react";
import { ChatPending, MessageChat } from "../../types/types.d";
import { ChatComponent } from "../../components/ChatComponent";
import { useSocketState } from "../../store/socketStore";
import { useAuthStore } from "../../store/authStore";
import { ChatRequest } from "../../components/ChatRequest";
import { ToastContainer, toast } from 'react-toastify';
import { NotificationChatPending } from "@/components/NotificationChatPending";


const Chat = () => {
  const [messageChat, setMessageChat] = useState<MessageChat[]>([]);
  const [chatPending, setChatPending] = useState<ChatPending>();

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

  useEffect(() => {
    if (chatPending) {
      toast.info(<NotificationChatPending chatPending={chatPending} />);
    }
  }, [chatPending])

  return (
    <section className="grid-row-12 grid h-dvh w-full gap-4 text-gray-700 container mx-auto">
      <header className="border-1 h-fit border-gray-300 rounded-2xl mt-4 flex items-center px-4 py-2">
        <div>
          <h2 className="font-bold">ChatArg</h2>  
        </div>
      </header>
      <div className="row-span-11 flex justify-center">
        <div className="flex flex-col items-center">
          <div>
            <h1 className="text-2xl font-bold">General Chat</h1>
          </div>
          <div className="w-full flex justify-center h-full gap-4">
            <div className="w-full">
              <ChatComponent messageChat={messageChat} />
            </div>
            {chatPending && (<ToastContainer />)}
        </div>
          <div className="flex w-full justify-center text-red-50"></div>
        </div>
      </div>
      <footer className="row-span-1 flex justify-center items-center text-red-500">
        @Marcos Arias 2025
      </footer>
    </section>
  );
};

export default Chat;
