import { Module } from "../../Models/module.model";
import { Role } from "../../Models/user.role.model";
import { UserModules } from "../../Models/user_modules.model";
import { IUserModules } from "../../Types/UserModule/UserModule";
import { Types } from "mongoose";
import { userRepo } from "../User/userRepo";
import { IUser } from "../../Types/User/User";
import { IModule } from "../../Types/Modules/Module";
export class UserModuleService {
  // ➤ Find all user modules
  static async findAllUserModules(): Promise<IUserModules[]> {
    try {
      return await UserModules.find();
    } catch (err) {
      throw new Error(`Failed to fetch user modules: ${err}`);
    }
  }
static async getUserWithRoleAndModules(userId: string){
  
  const user: IUser | null = await userRepo.getUserById(userId);
  if (!user) throw new Error("User not found");

  const role = await Role.findById(user.user_role);
  if (!role) throw new Error("Role not found");

  
  const userModules = await UserModules.findOne({ user_group_id: role._id });
 let modules: IModule[] = [];


  if (userModules?.module_id?.length) {
   
    modules = await Module.find({ _id: { $in: userModules.module_id } });
  }

  
  return {
    ...user,
    roleDetails: role,
    modules,
  };
};
static async createOrUpdateUserModule(
  user_group_id: string,
  module_id: string,
  dataToUpdate?: Partial<IUserModules>  // optional fields to update
): Promise<IUserModules> {

  return await UserModules.findOneAndUpdate(
    { user_group_id, module_id },   // find existing
    { 
      $set: dataToUpdate || {}      // update fields only if needed
    },
    { new: true, upsert: true }     // if not exist → create
  );
}


  // ➤ Create user module
  static async createUserModule(
    user_group_id: string,
    module_id: string
  ): Promise<IUserModules> {
    try {
      return await UserModules.create({
        user_group_id: new Types.ObjectId(user_group_id),
        module_id: new Types.ObjectId(module_id),
      });
    } catch (err) {
      throw new Error(`Failed to create user module: ${err}`);
    }
  }

  // ➤ Find by ID
  static async findUserModuleById(id: string): Promise<IUserModules | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
    try {
      return await UserModules.findById(id);
    } catch (err) {
      throw new Error(`Failed to find user module by ID: ${err}`);
    }
  }

  // ➤ Find by role & module
  static async findUserModuleByGroupAndModule(
    user_group_id: string,
    module_id: string
  ): Promise<IUserModules | null> {
    try {
      return await UserModules.findOne({
        user_group_id: new Types.ObjectId(user_group_id),
        module_id: new Types.ObjectId(module_id),
      });
    } catch (err) {
      throw new Error(
        `Failed to find user module by group and module: ${(err as Error).message}`
      );
    }
  }

  // ➤ Update by ID
  static async updateUserModuleById(
    id: string,
    updateData: Partial<IUserModules>
  ): Promise<IUserModules | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
    try {
      return await UserModules.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
    } catch (err) {
      throw new Error(`Failed to update user module: ${err}`);
    }
  }

  // ➤ Delete by ID
  static async deleteUserModuleById(id: string): Promise<IUserModules | null> {
    if (!Types.ObjectId.isValid(id)) throw new Error("Invalid ID format");
    try {
      return await UserModules.findByIdAndDelete(id);
    } catch (err) {
      throw new Error(`Failed to delete user module: ${err}`);
    }
  }

  // ➤ Get all with populated details
  static async getAllUserModules() {
    try {
      return UserModules.find()
        .populate("user_group_id")
        .populate("module_id");
    } catch (err) {
      throw new Error(`Failed to fetch populated user modules: ${err}`);
    }
  }

  // ➤ Get modules by role
  static async getUserModuleByRoleId(roleId: string) {
    if (!Types.ObjectId.isValid(roleId)) throw new Error("Invalid role ID");
    try {
      return UserModules.find({ user_group_id: new Types.ObjectId(roleId) })
        .populate("user_group_id")
        .populate("module_id");
    } catch (err) {
      throw new Error(`Failed to fetch modules for role: ${err}`);
    }
  }

  // ➤ Update modules for a role
 static async updateUserModulesByRoleId(roleId: string, module_ids: string[]) {
  if (!Types.ObjectId.isValid(roleId)) throw new Error("Invalid role ID");

  try {
    return await UserModules.updateOne(
      { user_group_id: new Types.ObjectId(roleId) }, // match ONE record
      {
        $set: {
          module_id: module_ids.map(id => new Types.ObjectId(id))
        }
      },
      { upsert: true } // create only if NOT exists
    );
  } catch (err) {
    throw new Error(`Failed to update user modules: ${err}`);
  }
}

  // ➤ Delete modules for role
  static async deleteUserModulesByRoleId(roleId: string) {
    if (!Types.ObjectId.isValid(roleId)) throw new Error("Invalid role ID");
    try {
      return UserModules.deleteMany({ user_group_id: new Types.ObjectId(roleId) });
    } catch (err) {
      throw new Error(`Failed to delete user modules: ${err}`);
    }
  }
}

