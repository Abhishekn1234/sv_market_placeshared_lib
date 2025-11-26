import { IUser } from "./User";
import { Types } from "mongoose";

export interface IUserRepo {
  findById(id: string): Promise<IUser | null>;
  verifyUser(userId: string): Promise<IUser | null>;
  unverifyUser(userId: string): Promise<IUser | null>;

  findUserByEmailOrPhone(email: string, phone: string): Promise<IUser | null>;
  findUserByEmailExcludingId(email: string, excludeUserId: string): Promise<IUser | null>;
  findUserByPhoneExcludingId(phone: string, excludeUserId: string): Promise<IUser | null>;

  findUserByEmail(email: string): Promise<IUser | null>;
  findUserByPhone(phone: string): Promise<IUser | null>;

  findUserById(userId: string): Promise<IUser | null>;
  findByIdentifier(identifier: string): Promise<IUser | null>;
  findBySocialId(socialId: string): Promise<IUser | null>;

  checkExistingUser(email: string, phone: string): Promise<IUser | null>;

  createUser(data: Partial<IUser>): Promise<IUser>;
  updateUserById(id: string, update: Partial<IUser>): Promise<IUser | null>;

  updateKYCStatus(userId: string, status: string): Promise<IUser | null>;

  findByIdLean(userId: string): Promise<any>;

  changePassword(id: string, newPassword: string): Promise<IUser | null>;

  getAllUsers(): Promise<{
    users: any[];
    totalUsers: number;
    totalItems: number;
  }>;
 getsearch(search:string):Promise<IUser[]>;
  getUserById(id: string): Promise<IUser | null>;
  createNewUser(data: Partial<IUser>): Promise<IUser>;
  updateUser(id: string, data: Partial<IUser>): Promise<IUser | null>;
  deleteUser(id: string): Promise<IUser | null>;
}
