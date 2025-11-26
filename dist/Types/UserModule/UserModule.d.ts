import { Types } from "mongoose";
import { UserRole } from "../Roles/UserRole";
import { IModule } from "../Modules/Module";
export interface IUserModules {
    user_group_id: Types.ObjectId | UserRole;
    module_id: Types.ObjectId[] | IModule[];
}
//# sourceMappingURL=UserModule.d.ts.map