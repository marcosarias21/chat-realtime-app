import { useAuthStore } from "@/store/authStore";
import { ChatRoomType } from "@/types/types.d";
import React from "react";

type Prop = ChatRoomType;

const ChatRoom: React.FC<Prop> = ({ users }) => {
  const { user } = useAuthStore();
  const usersFiltered = users.filter((u) => u.username != user?.username);
  console.log(usersFiltered);
  return (
    <div>
      <div className="flex gap-2">{usersFiltered.map((u) => u.username)}</div>
    </div>
  );
};

export default ChatRoom;
