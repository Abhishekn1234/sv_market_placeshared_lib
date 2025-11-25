import { ObjectId, Types } from "mongoose";
import { IUserModules } from "./UserModule";
import { IModule } from "./Module";

// export interface Roles extends Document {
//   _id:ObjectId;
//   name: string;
//   permissions?: string[];
// }

export type RoleType = "user" | "admin" | "superadmin" | "employee" | "coordinator";
// export type UserRole="customer"|"employee"|"admin"|"coordinator";

export type KYCSTATUS="pending"|"verified"|"rejected"|"not_submitted"|"submitted";

export interface UserRole extends Document {
  _id: Types.ObjectId;
  name: string;
  modules: IUserModules[]; // each role has an array of IUserModules
}