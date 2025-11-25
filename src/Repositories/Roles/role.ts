import { Module } from "../../Models/module.model";
import { Role } from "../../Models/user.role.model";
import { UserModules } from "../../Models/user_modules.model";
import { IModule, IUserModulesResponse } from "../../Types/Module";
import { UserRole } from "../../Types/Role";

export class Rolefunctions {

  static async updateRole(id: string, data: Partial<UserRole>) {
    return await Role.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteRole(id: string) {
    return await Role.findByIdAndDelete(id);
  }

  static async fetchRoleById(id: string) {
    return await Role.findById(id);
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


