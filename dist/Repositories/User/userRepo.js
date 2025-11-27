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
    // Find methods (always JSON)
    // -------------------------
    async findById(id) {
        return user_model_1.User.findById(id).lean();
    },
    async verifyUser(userId) {
        return user_model_1.User.findByIdAndUpdate(userId, { verified: true }, { new: true }).lean();
    },
    async unverifyUser(userId) {
        return user_model_1.User.findByIdAndUpdate(userId, { verified: false }, { new: true }).lean();
    },
    async findUserByEmailOrPhone(email, phone) {
        return user_model_1.User.findOne({ $or: [{ email }, { phone }] }).lean();
    },
    async findUserByEmailExcludingId(email, excludeUserId) {
        return user_model_1.User.findOne({ email, _id: { $ne: excludeUserId } }).lean();
    },
    async findUserByPhoneExcludingId(phone, excludeUserId) {
        return user_model_1.User.findOne({ phone, _id: { $ne: excludeUserId } }).lean();
    },
    async findUserByEmail(email) {
        return user_model_1.User.findOne({ email });
    },
    async findUserByPhone(phone) {
        return user_model_1.User.findOne({ phone });
    },
    async findUserById(userId) {
        return user_model_1.User.findById(userId).lean();
    },
    async findByIdentifier(identifier) {
        return user_model_1.User.findOne({
            $or: [{ email: identifier }, { phone: identifier }],
        }).lean();
    },
    async findBySocialId(socialId) {
        return user_model_1.User.findOne({ socialId }).lean();
    },
    async checkExistingUser(email, phone) {
        return user_model_1.User.findOne({ $or: [{ email }, { phone }] }).lean();
    },
    // -------------------------
    // Create user
    // -------------------------
    async createUser(data) {
        const user = await user_model_1.User.create(data);
        return user.toObject();
    },
    // Alias
    async createNewUser(data) {
        const user = await user_model_1.User.create(data);
        return user.toObject();
    },
    // -------------------------
    // Update user
    // -------------------------
    async updateUserById(id, update) {
        return user_model_1.User.findByIdAndUpdate(id, update, { new: true }).lean();
    },
    updateKYCStatus(userId, status) {
        return user_model_1.User.findByIdAndUpdate(userId, { kycStatus: status }, { new: true }).lean();
    },
    findByIdLean(userId) {
        return user_model_1.User.findById(userId).lean();
    },
    async changePassword(id, newPassword) {
        const hashed = await bcryptjs_1.default.hash(newPassword, 10);
        return user_model_1.User.findByIdAndUpdate(id, { password: hashed }, { new: true }).lean();
    },
    // -------------------------
    // Get ALL Users with Roles + Modules
    // -------------------------
    async getAllUsers() {
        const users = await user_model_1.User.find().sort({ createdAt: -1 }).lean();
        const roles = await user_role_model_1.Role.find().lean();
        const userModules = await user_modules_model_1.UserModules.find().lean();
        const moduleIds = userModules.flatMap((um) => (um.module_id ?? []).map((m) => m.toString()));
        const modules = await module_model_1.Module.find({ _id: { $in: moduleIds } }).lean();
        const modulesMap = new Map();
        modules.forEach((m) => modulesMap.set(m._id.toString(), m));
        const roleModulesMap = new Map();
        userModules.forEach((um) => {
            const mods = (um.module_id || [])
                .map((m) => modulesMap.get(m.toString()))
                .filter(Boolean);
            roleModulesMap.set(um.user_group_id.toString(), mods);
        });
        const rolesMap = new Map();
        roles.forEach((role) => rolesMap.set(role._id.toString(), {
            ...role,
            modules: roleModulesMap.get(role._id.toString()) || [],
        }));
        const usersWithRoles = users.map((user) => ({
            ...user,
            role: user.user_role ? rolesMap.get(user.user_role.toString()) : null,
        }));
        return {
            users: usersWithRoles,
            totalUsers: users.length,
            totalItems: users.length,
        };
    },
    // -------------------------
    // Search users
    // -------------------------
    async getsearch(search) {
        if (!search.trim())
            return [];
        return user_model_1.User.find({
            $or: [
                { fullName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
            ],
        })
            .lean();
    },
    // -------------------------
    // Delete user
    // -------------------------
    async deleteUser(id) {
        return user_model_1.User.findByIdAndDelete(id).lean();
    },
    async getUserById(id) {
        return user_model_1.User.findById(id).lean();
    },
    async updateUser(id, data) {
        return user_model_1.User.findByIdAndUpdate(id, data, { new: true }).lean();
    },
};
