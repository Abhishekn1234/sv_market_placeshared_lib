import { Types } from "mongoose";
import { UserRole } from "../Roles/UserRole";
import { IModule } from "../Modules/Module";
import mongoose from "mongoose";
interface IUserModulesWithId extends IUserModules {
  _id: mongoose.Types.ObjectId;
}

export interface IUserModules extends Document {
  user_group_id: Types.ObjectId | UserRole;
  module_id: Types.ObjectId[] | IModule[];  
}
