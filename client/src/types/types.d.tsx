export interface MessageChat {
  _id: string
  username: string
  message: string
}

export interface User {
  _id: string
  username: string
  email: string,
  password: string
  __v: number
}

export interface JsonResp {
  message: string,
  user: User,
  token: string
}
