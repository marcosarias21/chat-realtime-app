import { create } from "zustand";

interface State {
  message: string;
}

interface Action {
  setMessage: (newMessage: string) => void;
}

export const useMessageStore = create<State & Action>((set) => ({
  message: "",
  setMessage: (newMessage) =>
    set({
      message: newMessage,
    }),
}));
