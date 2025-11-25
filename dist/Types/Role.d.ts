import { Types } from "mongoose";
import { IUserModules } from "./UserModule";
export type RoleType = "user" | "admin" | "superadmin" | "employee" | "coordinator";
export type KYCSTATUS = "pending" | "verified" | "rejected" | "not_submitted" | "submitted";
export interface UserRole extends Document {
    _id: Types.ObjectId;
    name: string;
    modules: IUserModules[];
}
//# sourceMappingURL=Role.d.ts.map