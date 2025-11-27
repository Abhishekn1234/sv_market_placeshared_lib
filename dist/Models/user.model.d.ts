import mongoose, { Types } from "mongoose";
import { IUser } from "../Types/User/User";
export interface IUserMethods {
    matchPassword(password: string): Promise<boolean>;
}
export declare const User: mongoose.Model<IUser, {}, IUserMethods, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & Omit<IUser & Required<{
    _id: Types.ObjectId;
}>, "matchPassword"> & IUserMethods, any>;
//# sourceMappingURL=user.model.d.ts.map