import { IUserModulesResponse } from "../UserModule/userModuleResponse";

export interface UserRoleResponse {
  _id: string;
  name: string;
  modules: IUserModulesResponse[];
}