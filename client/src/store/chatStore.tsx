import { ChatRoomFiltered } from '@/types/types.d'
import { create } from 'zustand'

interface State {
  chatAvailable: ChatRoomFiltered[]
}

interface Action {
  setChatAvailable: (newChatAvaible: ChatRoomFiltered[]) => void
}

export const useChatStore = create<State & Action>((set) => ({
  chatAvailable: [],
  setChatAvailable: (newChatAvaible) =>
    set({
      chatAvailable: newChatAvaible,
    }),
}))
