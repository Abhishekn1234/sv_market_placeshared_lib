import { Types } from "mongoose";
import { IUserModulesResponse } from "../UserModule/userModuleResponse";
export interface UserRole {
    _id: Types.ObjectId;
    name: string;
    modules: IUserModulesResponse[];
}
//# sourceMappingURL=UserRole.d.ts.map