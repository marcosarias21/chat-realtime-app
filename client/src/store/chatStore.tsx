import { ChatRoomActual } from '@/types/types.d'
import { create } from 'zustand'

interface State {
  chatAvailable: ChatRoomActual[]
}

interface Action {
  setChatAvailable: (newChatAvaible: ChatRoomActual[]) => void
}

export const useChatStore = create<State & Action>((set) => ({
  chatAvailable: [],
  setChatAvailable: (newChatAvaible) =>
    set({
      chatAvailable: newChatAvaible,
    }),
}))
