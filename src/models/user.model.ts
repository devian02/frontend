import { IntellectualProperty } from "./ip.model";

export interface User {
  id: string;
  name: string;
  email: string;
  ethAddress: string;
  balance?: number;
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
}

export interface SignInUser {
  user: string;
  password: string;
}



export interface UserProfile {
  id: string;
  name: string;
  email: string;
  ethAddress: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
  intellectualProperties: IntellectualProperty[];
}
