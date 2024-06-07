import { User } from "./user.model";

export interface CreateIntellectualProperty {
  name: string;
  description: string;
  price: number;
  file: File;
}

export interface IntellectualProperty {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  owner: User;
  price: number;
  documentHash: string;
  transactionProofHash: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  deleted?: boolean;
}
