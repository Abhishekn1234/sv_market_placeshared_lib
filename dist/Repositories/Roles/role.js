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
        const roles = await user_role_model_1.Role.find(); // get all roles
        const rolesWithModules = await Promise.all(roles.map(async (role) => {
            // Find user_modules entry for this role
            const userModulesEntry = await user_modules_model_1.UserModules.findOne({
                user_group_id: role._id,
            });
            let modules = []; // explicitly type it
            if (userModulesEntry && userModulesEntry.module_id.length) {
                // Fetch all modules whose _id is in module_id array
                modules = await module_model_1.Module.find({
                    _id: { $in: userModulesEntry.module_id },
                }); // type cast
            }
            return {
                ...role.toObject(),
                modules, // add modules array to the role
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
