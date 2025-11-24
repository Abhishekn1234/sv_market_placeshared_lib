import { Module } from "../../Models/module.model";
import { Role } from "../../Models/user.role.model";
import { UserModules } from "../../Models/user_modules.model";
import { IModule } from "../../Types/Module";
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
   static async fetchRolesWithModules(): Promise<(UserRole & { modules: IModule[] })[]> {
  const roles = await Role.find(); // get all roles

  const rolesWithModules = await Promise.all(
    roles.map(async (role) => {
      // Find user_modules entry for this role
      const userModulesEntry = await UserModules.findOne({
        user_group_id: role._id,
      });

      let modules: IModule[] = []; // explicitly type it
      if (userModulesEntry && userModulesEntry.module_id.length) {
        // Fetch all modules whose _id is in module_id array
        modules = await Module.find({
          _id: { $in: userModulesEntry.module_id },
        }) as IModule[]; // type cast
      }

      return {
        ...role.toObject(),
        modules, // add modules array to the role
      };
    })
  );

  return rolesWithModules;
}
    static async fetchRoles() {
        return await Role.find();
    }

    static async addRoles(name: string): Promise<UserRole> {
        return await Role.create({ name });
    }
}


