"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkModuleAcces = exports.normalizeRole = void 0;
exports.checkModuleAccess = checkModuleAccess;
const user_model_1 = require("../../Models/user.model");
const user_modules_model_1 = require("../../Models/user_modules.model");
const module_model_1 = require("../../Models/module.model");
const usermodule_1 = require("../../Repositories/UserModules/usermodule");
const module_repo_1 = require("../../Repositories/Modules/module.repo");
async function checkModuleAccess(userId, moduleKey) {
    // 1. Load user with role
    const user = await user_model_1.User.findById(userId).populate("user_role");
    if (!user) {
        throw new Error("Invalid user");
    }
    const roleId = user.user_role;
    if (!roleId) {
        throw new Error("User has no role assigned");
    }
    // 2. Find module by modulelanguagekey
    const moduleData = await module_model_1.Module.findOne({ modulelanguagekey: moduleKey });
    if (!moduleData) {
        throw new Error(`Module '${moduleKey}' not found`);
    }
    // 3. Check mapping in UserModules
    const userModule = await user_modules_model_1.UserModules.findOne({
        user_group_id: roleId,
        module_id: moduleData._id,
    });
    if (!userModule) {
        throw new Error("Access Denied: You do not have permission for this module");
    }
    return true;
}
const normalizeRole = (role) => {
    if (!role)
        throw new Error("User role not found");
    return typeof role === "string" ? role : role.toString();
};
exports.normalizeRole = normalizeRole;
const checkModuleAcces = async (moduleName, role) => {
    const normalizedRole = (0, exports.normalizeRole)(role);
    const module = await module_repo_1.Modulefunctions.findByModules(moduleName);
    if (!module)
        throw new Error(`Module '${moduleName}' not found`);
    const access = await usermodule_1.UserModuleService.findUserModuleByGroupAndModule(normalizedRole, module._id.toString());
    if (!access) {
        throw new Error(`User does not have access to '${moduleName}'`);
    }
    return true;
};
exports.checkModuleAcces = checkModuleAcces;
