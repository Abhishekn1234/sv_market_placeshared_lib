import { User, } from "../../Models/user.model";
import { IUser } from "../../Types/User/User";
import bcrypt from "bcryptjs";
import { Role } from "../../Models/user.role.model";

import { UserModules } from "../../Models/user_modules.model";
import { Module } from "../../Models/module.model";
import { IUserRepo } from "../../Types/User/userRepotypes";

export const userRepo: IUserRepo = {

  // -------------------------
  // Find methods (always JSON)
  // -------------------------

  async findById(id: string) {
    return User.findById(id).lean();
  },

  async verifyUser(userId: string) {
    return User.findByIdAndUpdate(userId, { verified: true }, { new: true }).lean();
  },

  async unverifyUser(userId: string) {
    return User.findByIdAndUpdate(userId, { verified: false }, { new: true }).lean();
  },

  async findUserByEmailOrPhone(email: string, phone: string) {
    return User.findOne({ $or: [{ email }, { phone }] }).lean();
  },

  async findUserByEmailExcludingId(email: string, excludeUserId: string) {
    return User.findOne({ email, _id: { $ne: excludeUserId } }).lean();
  },

  async findUserByPhoneExcludingId(phone: string, excludeUserId: string) {
    return User.findOne({ phone, _id: { $ne: excludeUserId } }).lean();
  },

  async findUserByEmail(email: string) {
    return User.findOne({ email }).lean();
  },

  async findUserByPhone(phone: string) {
    return User.findOne({ phone }).lean();
  },

  async findUserById(userId: string) {
    return User.findById(userId).lean();
  },

  async findByIdentifier(identifier: string) {
    return User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    }).lean();
  },

  async findBySocialId(socialId: string) {
    return User.findOne({ socialId }).lean();
  },

  async checkExistingUser(email: string, phone: string) {
    return User.findOne({ $or: [{ email }, { phone }] }).lean();
  },

  // -------------------------
  // Create user
  // -------------------------
  async createUser(data: IUser): Promise<IUser> {
    const user = await User.create(data);
    return user.toObject();
  },

  // Alias
  async createNewUser(data: IUser) {
    const user = await User.create(data);
    return user.toObject();
  },

  // -------------------------
  // Update user
  // -------------------------
  async updateUserById(id: string, update: Partial<IUser>) {
    return User.findByIdAndUpdate(id, update, { new: true }).lean();
  },

  updateKYCStatus(userId: string, status: string) {
    return User.findByIdAndUpdate(userId, { kycStatus: status }, { new: true }).lean();
  },

  findByIdLean(userId: string) {
    return User.findById(userId).lean();
  },

  async changePassword(id: string, newPassword: string) {
    const hashed = await bcrypt.hash(newPassword, 10);
    return User.findByIdAndUpdate(id, { password: hashed }, { new: true }).lean();
  },

  // -------------------------
  // Get ALL Users with Roles + Modules
  // -------------------------
  async getAllUsers() {
    const users = await User.find().sort({ createdAt: -1 }).lean();

    const roles = await Role.find().lean();
    const userModules = await UserModules.find().lean();

    const moduleIds = userModules.flatMap(
      (um) => (um.module_id ?? []).map((m: any) => m.toString())
    );

    const modules = await Module.find({ _id: { $in: moduleIds } }).lean();

    const modulesMap = new Map<string, any>();
    modules.forEach((m) => modulesMap.set(m._id.toString(), m));

    const roleModulesMap = new Map<string, any[]>();
    userModules.forEach((um) => {
      const mods = (um.module_id || [])
        .map((m: any) => modulesMap.get(m.toString()))
        .filter(Boolean);
      roleModulesMap.set(um.user_group_id.toString(), mods);
    });

    const rolesMap = new Map<string, any>();
    roles.forEach((role) =>
      rolesMap.set(role._id.toString(), {
        ...role,
        modules: roleModulesMap.get(role._id.toString()) || [],
      })
    );

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
  async getsearch(search: string): Promise<IUser[]> {
    if (!search.trim()) return [];

    return User.find({
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
  async deleteUser(id: string) {
    return User.findByIdAndDelete(id).lean();
  },
  async getUserById(id: string) {
  return User.findById(id).lean();
},

async updateUser(id: string, data: Partial<IUser>) {
  return User.findByIdAndUpdate(id, data, { new: true }).lean();
},

};

