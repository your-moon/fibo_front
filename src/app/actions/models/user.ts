export interface SingleUserResponse {
  status: number;
  message: string;
  data: GetUser;
}

export interface AllUserResponse {
  status: string;
  message: string;
  data: GetUser[];
}

export interface GetUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  reputation: number;
}
