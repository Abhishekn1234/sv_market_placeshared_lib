import mongoose from "mongoose";
import { UserRole } from "../Types/Role";
export declare const Role: mongoose.Model<UserRole, {}, {}, {}, mongoose.Document<unknown, {}, UserRole, {}, {}> & UserRole & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=user.role.model.d.ts.map