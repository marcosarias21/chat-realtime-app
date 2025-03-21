import { create } from "zustand";

interface State {
  username: string,
  password: string
}

interface Action {
  setUsername: (username: string) => void,
  setPassword: (password: string) => void
}

export const useLoginStore = create<State & Action>((set) => ({
  username: "",
  setUsername: (newUsername) => set({
    username: newUsername
  }),
  password: "",
  setPassword: (newPassword) => set({
    password: newPassword
  })
}))