import { Module } from "../../Models/module.model";
import { Role } from "../../Models/user.role.model";
import { UserModules } from "../../Models/user_modules.model";
import {IUserModulesResponse} from "../../Types/UserModule/userModuleResponse";
import { UserRole } from "../../Types/Roles/UserRole";
import { IModule } from "../../Types/Modules/Module";
import { Types } from "mongoose";
import { IUserModules } from "../../Types/UserModule/UserModule";

export class Rolefunctions {

  static async updateRole(id: string, data: Partial<UserRole>) {
    return await Role.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteRole(id: string) {
    return await Role.findByIdAndDelete(id);
  }

 static async fetchRoleById(id: string): Promise<{
  _id: Types.ObjectId;
  name: string;
  modules: IModule[];
} | null> {

  // 1. Fetch the role
  const role = await Role.findById(id).lean<UserRole | null>();
  if (!role) return null;

  // 2. Fetch mapping entry from UserModules
  const userModulesEntry = await UserModules.findOne({
    user_group_id: role._id,
  }).lean<IUserModules | null>();

  let modules: IModule[] = [];

  // 3. If modules exist, fetch full module docs
  if (userModulesEntry?.module_id?.length) {
    const moduleIds = userModulesEntry.module_id as Types.ObjectId[];

    modules = await Module.find({
      _id: { $in: moduleIds },
    })
      .lean<IModule[]>()
      .exec();
  }

  // 4. Return unified role + modules result
  return {
    _id: role._id,
    name: role.name,
    modules,
  };
}



  static async fetchByNames(name: string) {
    return await Role.findOne({ name });
  }
  static async fetchRolesWithModules(): Promise<UserRole[]> {
    // 1. Fetch all roles
    const roles = await Role.find().lean();

    // 2. For each role, find its linked modules and fetch full module details
    const rolesWithModules = await Promise.all(
      roles.map(async (role) => {
        const userModulesEntry = await UserModules.findOne({ user_group_id: role._id });

        let modules: IUserModulesResponse[] = [];
        if (userModulesEntry && userModulesEntry.module_id.length) {
          modules = await Module.find({ _id: { $in: userModulesEntry.module_id } }) as IUserModulesResponse[];
        }

        // Only pick name and modules
        return {
          _id: role._id,
          name: role.name,
          modules, // attach modules array
        };
      })
    );
    return rolesWithModules as UserRole[];
  }

  static async fetchRoles() {
    return await Role.find();
  }

  static async addRoles(name: string): Promise<UserRole> {
    return await Role.create({ name });
  }
}


