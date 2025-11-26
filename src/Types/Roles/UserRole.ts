import { Types } from "mongoose";

import { IUserModulesResponse } from "../UserModule/userModuleResponse";


export interface UserRole {
  _id: Types.ObjectId;
  name: string;
  modules: IUserModulesResponse[]; // each role has an array of IUserModules
}