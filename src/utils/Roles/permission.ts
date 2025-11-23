import { User } from "../../Models/user.model";
import { UserModules } from "../../Models/user_modules.model";
import { Module } from "../../Models/module.model";
import { UserModuleService } from "../../Repositories/UserModules/usermodule";
import { Modulefunctions } from "../../Repositories/Modules/module.repo";
import { Types } from "mongoose";

export async function checkModuleAccess(userId: string, moduleKey: string) {
  // 1. Load user with role
  const user = await User.findById(userId).populate("user_role");

  if (!user) {
    throw new Error("Invalid user");
  }

  const roleId = user.user_role;

  if (!roleId) {
    throw new Error("User has no role assigned");
  }

  // 2. Find module by modulelanguagekey (or module name)
  const moduleData = await Module.findOne({ modulelanguagekey: moduleKey });

  if (!moduleData) {
    throw new Error(`Module '${moduleKey}' not found`);
  }

  // 3. Check mapping in UserModules
  const userModule = await UserModules.findOne({
    user_group_id: roleId,
    module_id: moduleData._id,
  });

  if (!userModule) {
    throw new Error("Access Denied: You do not have permission for this module");
  }

  return true;
}



const normalizeRole = (role: Types.ObjectId | string | null | undefined): string => {
  if (!role) throw new Error("User role not found");
  return typeof role === "string" ? role : role.toString();
};

const checkModuleAcces = async (
  moduleName: string,
  role: Types.ObjectId | string | null | undefined
) => {

  const normalizedRole = normalizeRole(role);

  const module = await Modulefunctions.findByModules(moduleName);
  if (!module) throw new Error(`Module '${moduleName}' not found`);

  const access = await UserModuleService.findUserModuleByGroupAndModule(
    normalizedRole,
    module._id.toString()
  );

  if (!access) {
    throw new Error(`User does not have access to '${moduleName}'`);
  }

  return true;
};
