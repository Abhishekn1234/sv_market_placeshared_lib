"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModuleService = void 0;
const module_model_1 = require("../../Models/module.model");
const user_role_model_1 = require("../../Models/user.role.model");
const user_modules_model_1 = require("../../Models/user_modules.model");
const mongoose_1 = require("mongoose");
const userRepo_1 = require("../User/userRepo");
class UserModuleService {
    // ➤ Find all user modules
    static async findAllUserModules() {
        try {
            return await user_modules_model_1.UserModules.find();
        }
        catch (err) {
            throw new Error(`Failed to fetch user modules: ${err}`);
        }
    }
    static async getUserWithRoleAndModules(userId) {
        const user = await userRepo_1.userRepo.getUserById(userId);
        if (!user)
            throw new Error("User not found");
        const role = await user_role_model_1.Role.findById(user.user_role);
        if (!role)
            throw new Error("Role not found");
        const userModules = await user_modules_model_1.UserModules.findOne({ user_group_id: role._id });
        let modules = [];
        if (userModules?.module_id?.length) {
            modules = await module_model_1.Module.find({ _id: { $in: userModules.module_id } });
        }
        return {
            ...user.toObject(),
            roleDetails: role,
            modules,
        };
    }
    ;
    // ➤ Create user module
    static async createUserModule(user_group_id, module_id) {
        try {
            return await user_modules_model_1.UserModules.create({
                user_group_id: new mongoose_1.Types.ObjectId(user_group_id),
                module_id: new mongoose_1.Types.ObjectId(module_id),
            });
        }
        catch (err) {
            throw new Error(`Failed to create user module: ${err}`);
        }
    }
    // ➤ Find by ID
    static async findUserModuleById(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id))
            throw new Error("Invalid ID format");
        try {
            return await user_modules_model_1.UserModules.findById(id);
        }
        catch (err) {
            throw new Error(`Failed to find user module by ID: ${err}`);
        }
    }
    // ➤ Find by role & module
    static async findUserModuleByGroupAndModule(user_group_id, module_id) {
        try {
            return await user_modules_model_1.UserModules.findOne({
                user_group_id: new mongoose_1.Types.ObjectId(user_group_id),
                module_id: new mongoose_1.Types.ObjectId(module_id),
            });
        }
        catch (err) {
            throw new Error(`Failed to find user module by group and module: ${err.message}`);
        }
    }
    // ➤ Update by ID
    static async updateUserModuleById(id, updateData) {
        if (!mongoose_1.Types.ObjectId.isValid(id))
            throw new Error("Invalid ID format");
        try {
            return await user_modules_model_1.UserModules.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });
        }
        catch (err) {
            throw new Error(`Failed to update user module: ${err}`);
        }
    }
    // ➤ Delete by ID
    static async deleteUserModuleById(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id))
            throw new Error("Invalid ID format");
        try {
            return await user_modules_model_1.UserModules.findByIdAndDelete(id);
        }
        catch (err) {
            throw new Error(`Failed to delete user module: ${err}`);
        }
    }
    // ➤ Get all with populated details
    static async getAllUserModules() {
        try {
            return user_modules_model_1.UserModules.find()
                .populate("user_group_id")
                .populate("module_id");
        }
        catch (err) {
            throw new Error(`Failed to fetch populated user modules: ${err}`);
        }
    }
    // ➤ Get modules by role
    static async getUserModuleByRoleId(roleId) {
        if (!mongoose_1.Types.ObjectId.isValid(roleId))
            throw new Error("Invalid role ID");
        try {
            return user_modules_model_1.UserModules.find({ user_group_id: new mongoose_1.Types.ObjectId(roleId) })
                .populate("user_group_id")
                .populate("module_id");
        }
        catch (err) {
            throw new Error(`Failed to fetch modules for role: ${err}`);
        }
    }
    // ➤ Update modules for a role
    static async updateUserModulesByRoleId(roleId, module_ids) {
        if (!mongoose_1.Types.ObjectId.isValid(roleId))
            throw new Error("Invalid role ID");
        try {
            return await user_modules_model_1.UserModules.updateOne({ user_group_id: new mongoose_1.Types.ObjectId(roleId) }, // match ONE record
            {
                $set: {
                    module_id: module_ids.map(id => new mongoose_1.Types.ObjectId(id))
                }
            }, { upsert: true } // create only if NOT exists
            );
        }
        catch (err) {
            throw new Error(`Failed to update user modules: ${err}`);
        }
    }
    // ➤ Delete modules for role
    static async deleteUserModulesByRoleId(roleId) {
        if (!mongoose_1.Types.ObjectId.isValid(roleId))
            throw new Error("Invalid role ID");
        try {
            return user_modules_model_1.UserModules.deleteMany({ user_group_id: new mongoose_1.Types.ObjectId(roleId) });
        }
        catch (err) {
            throw new Error(`Failed to delete user modules: ${err}`);
        }
    }
}
exports.UserModuleService = UserModuleService;
