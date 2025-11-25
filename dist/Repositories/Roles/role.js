"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rolefunctions = void 0;
const module_model_1 = require("../../Models/module.model");
const user_role_model_1 = require("../../Models/user.role.model");
const user_modules_model_1 = require("../../Models/user_modules.model");
class Rolefunctions {
    static async updateRole(id, data) {
        return await user_role_model_1.Role.findByIdAndUpdate(id, data, { new: true });
    }
    static async deleteRole(id) {
        return await user_role_model_1.Role.findByIdAndDelete(id);
    }
    static async fetchRoleById(id) {
        return await user_role_model_1.Role.findById(id);
    }
    static async fetchByNames(name) {
        return await user_role_model_1.Role.findOne({ name });
    }
    static async fetchRolesWithModules() {
        // 1. Fetch all roles
        const roles = await user_role_model_1.Role.find().lean();
        // 2. For each role, find its linked modules and fetch full module details
        const rolesWithModules = await Promise.all(roles.map(async (role) => {
            const userModulesEntry = await user_modules_model_1.UserModules.findOne({ user_group_id: role._id });
            let modules = [];
            if (userModulesEntry && userModulesEntry.module_id.length) {
                modules = await module_model_1.Module.find({ _id: { $in: userModulesEntry.module_id } });
            }
            // Only pick name and modules
            return {
                _id: role._id,
                name: role.name,
                modules, // attach modules array
            };
        }));
        return rolesWithModules;
    }
    static async fetchRoles() {
        return await user_role_model_1.Role.find();
    }
    static async addRoles(name) {
        return await user_role_model_1.Role.create({ name });
    }
}
exports.Rolefunctions = Rolefunctions;
