import { Types } from "mongoose";
import { IUserModulesResponse } from "../UserModule/userModuleResponse";
export interface UserRole extends Document {
    _id: Types.ObjectId;
    name: string;
    modules: IUserModulesResponse[] | [];
}
//# sourceMappingURL=UserRole.d.ts.map