export interface MessageChatGeneral {
  _id: string
  user: Username
  message: string
}

export interface User {
  _id: string
  username: string
  email: string
  password: string
  __v: number
}

export interface JsonResp {
  message: string
  user: User
  token: string
}

type Username = {
  username: string
  _id: string
}

type UserSendingRequest = {
  _id: string
  username: string
}

export interface ChatPending {
  receiver: string
  sender: UserSendingRequest
  _id: string
  status: string
}

export type UserChat = {
  _id: string
  username: string
}

export interface MessageChat {
  _id: string
  sender: Username
  text: string
  filename: string
  buffer: string
}

export interface ChatRoomType {
  _id: string
  users: UserChat[]
  message: MessageChat[]
}

export interface ChatRoomActual {
  _id: string
  users: UserChat[] | undefined
  message: MessageChat[] | undefined
}

export interface ChatRoomFiltered {
  _id: string
  users: UserChat | undefined
  message: MessageChat[] | undefined
}
