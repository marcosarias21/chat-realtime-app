export interface MessageChat {
  _id: string;
  user: Username;
  message: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  __v: number;
}

export interface JsonResp {
  message: string;
  user: User;
  token: string;
}

type Username = {
  username: string;
};

type UserSendingRequest = {
  _id: string;
  username: string;
};

export interface ChatPending {
  receiver: string;
  sender: UserSendingRequest;
  _id: string;
  status: string;
}
