import mongoose, { Types } from "mongoose";
import { IUser } from "../Types/User/User";
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & {
    _id: Types.ObjectId;
}, any>;
//# sourceMappingURL=user.model.d.ts.map