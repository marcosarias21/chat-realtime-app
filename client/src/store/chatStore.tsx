import { ChatRoomFiltered } from '@/types/types.d'
import { create } from 'zustand'

interface State {
  chatAvailable: ChatRoomFiltered[]
  usersOnline: Map<string, string>
}

interface Action {
  setChatAvailable: (newChatAvaible: ChatRoomFiltered[]) => void
  setUsersOnline: (newUserOnline: Map<string, string>) => void
}

export const useChatStore = create<State & Action>((set) => ({
  chatAvailable: [],
  setChatAvailable: (newChatAvaible) =>
    set({
      chatAvailable: newChatAvaible,
    }),
  usersOnline: new Map(),
  setUsersOnline: (newUserOnline) =>
    set({
      usersOnline: newUserOnline,
    }),
}))
