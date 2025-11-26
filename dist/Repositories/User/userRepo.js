"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepo = void 0;
const user_model_1 = require("../../Models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_role_model_1 = require("../../Models/user.role.model");
const user_modules_model_1 = require("../../Models/user_modules.model");
const module_model_1 = require("../../Models/module.model");
exports.userRepo = {
    // -------------------------
    // Existing Methods
    // -------------------------
    async findById(id) {
        return user_model_1.User.findById(id);
    },
    async verifyUser(userId) {
        return user_model_1.User.findByIdAndUpdate(userId, { verified: true }, { new: true });
    },
    // Optionally: Unverify a user
    async unverifyUser(userId) {
        return user_model_1.User.findByIdAndUpdate(userId, { verified: false }, { new: true });
    },
    async findUserByEmailOrPhone(email, phone) {
        return user_model_1.User.findOne({
            $or: [{ email }, { phone }],
        });
    },
    async findUserByEmailExcludingId(email, excludeUserId) {
        return user_model_1.User.findOne({
            email,
            _id: { $ne: excludeUserId },
        });
    },
    async findUserByPhoneExcludingId(phone, excludeUserId) {
        return user_model_1.User.findOne({
            phone,
            _id: { $ne: excludeUserId },
        });
    },
    async findUserByEmail(email) {
        return user_model_1.User.findOne({ email });
    },
    async findUserByPhone(phone) {
        return user_model_1.User.findOne({ phone });
    },
    async findUserById(userId) {
        return user_model_1.User.findById(userId);
    },
    async findByIdentifier(identifier) {
        return user_model_1.User.findOne({
            $or: [{ email: identifier }, { phone: identifier }],
        });
    },
    async findBySocialId(socialId) {
        return user_model_1.User.findOne({ socialId });
    },
    async checkExistingUser(email, phone) {
        return user_model_1.User.findOne({
            $or: [{ email }, { phone }],
        });
    },
    async createUser(data) {
        return user_model_1.User.create(data);
    },
    async updateUserById(id, update) {
        return user_model_1.User.findByIdAndUpdate(id, update, { new: true });
    },
    updateKYCStatus(userId, status) {
        return user_model_1.User.findByIdAndUpdate(userId, { kycStatus: status }, { new: true });
    },
    findByIdLean(userId) {
        return user_model_1.User.findById(userId).lean();
    },
    async changePassword(id, newPassword) {
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        return user_model_1.User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
    },
    // -------------------------
    // ✔ Added CRUD Functionality
    // -------------------------
    // Get all users
    async getAllUsers() {
        // 1️⃣ Fetch all users
        const users = await user_model_1.User.find().sort({ createdAt: -1 }).lean();
        // 2️⃣ Get all unique role IDs from users (excluding null)
        const roleIds = users
            .map(u => u.user_role)
            .filter(Boolean)
            .map(id => id);
        // 3️⃣ Fetch ALL roles (not only user roles)
        const roles = await user_role_model_1.Role.find().lean();
        // 4️⃣ Fetch all UserModules (for all roles)
        const userModulesList = await user_modules_model_1.UserModules.find().lean();
        // 5️⃣ Collect all module IDs
        const moduleIds = userModulesList.flatMap(um => (um.module_id ?? []).map((m) => m.toString()));
        // 6️⃣ Fetch all modules
        const modules = await module_model_1.Module.find({ _id: { $in: moduleIds } }).lean();
        // 7️⃣ Build modules map
        const modulesMap = new Map();
        modules.forEach(mod => modulesMap.set(mod._id.toString(), mod));
        // 8️⃣ Build roleId → modules[] map
        const roleModulesMap = new Map();
        userModulesList.forEach(um => {
            const mods = (um.module_id || [])
                .map((m) => modulesMap.get(m.toString()))
                .filter(Boolean);
            roleModulesMap.set(um.user_group_id.toString(), mods);
        });
        // 9️⃣ Build roleId → roleWithModules map
        const rolesMap = new Map();
        roles.forEach(role => {
            rolesMap.set(role._id.toString(), {
                ...role,
                modules: roleModulesMap.get(role._id.toString()) || []
            });
        });
        // 🔟 Inject role + modules into each user
        const usersWithRoles = users.map(user => {
            const roleId = user.user_role?.toString();
            return {
                ...user,
                role: roleId ? rolesMap.get(roleId) : null
            };
        });
        return {
            users: usersWithRoles,
            totalUsers: users.length,
            totalItems: users.length
        };
    },
    // Get user by ID
    async getUserById(id) {
        const user = await user_model_1.User.findById(id);
        console.log(user);
        return user;
    },
    async getsearch(search) {
        if (!search || search.trim() === "")
            return [];
        // Search users and populate KYC documents and role
        const users = await user_model_1.User.find({
            $or: [
                { fullName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
            ],
        })
            // .populate("documents")   // populate KYC documents
            .populate("user_role"); // populate role
        return users;
    },
    // Create user (already exists, but adding alias if needed)
    async createNewUser(data) {
        return user_model_1.User.create(data);
    },
    // Update user by ID
    async updateUser(id, data) {
        return user_model_1.User.findByIdAndUpdate(id, data, { new: true });
    },
    // Delete user by ID
    async deleteUser(id) {
        return user_model_1.User.findByIdAndDelete(id);
    },
};
