export interface MessageChat {
  _id: string
  user: Username
  text: string
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

export interface ChatRoomType {
  _id: string
  users: UserChat[]
  message: MessageChat[]
}

export interface ChatRoomActual {
  _id: string
  users: UserChat | undefined
  message: MessageChat[] | undefined
}
