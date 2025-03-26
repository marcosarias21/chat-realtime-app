import { create } from "zustand";

type State = {
  open: boolean;
  userReceiver: string;
};

type Action = {
  setOpen: (newOpen: boolean) => void;
  setUserReceiver: (newUserReceiver: string) => void;
};

export const useModalStore = create<State & Action>((set) => ({
  open: false,
  setOpen: (newOpen) =>
    set({
      open: newOpen,
    }),
  userReceiver: "",
  setUserReceiver: (newUserReceiver) =>
    set({
      userReceiver: newUserReceiver,
    }),
}));
