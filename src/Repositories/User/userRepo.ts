import { User, } from "../../Models/user.model";
import { IUser } from "../../Types/User/User";
import bcrypt from "bcryptjs";
import { Role } from "../../Models/user.role.model";

import { UserModules } from "../../Models/user_modules.model";
import { Module } from "../../Models/module.model";
import { IUserRepo } from "../../Types/User/userRepotypes";

export const  userRepo: IUserRepo= {
  // -------------------------
  // Existing Methods
  // -------------------------
  async findById(id: string) {
    return User.findById(id);
  },
   async verifyUser(userId: string) {
    return User.findByIdAndUpdate(
      userId,
      { verified: true },
      { new: true }
    );
  },


  // Optionally: Unverify a user
  async unverifyUser(userId: string) {
    return User.findByIdAndUpdate(
      userId,
      { verified: false },
      { new: true }
    );
  },

  async findUserByEmailOrPhone(email: string, phone: string) {
    return User.findOne({
      $or: [{ email }, { phone }],
    });
  },

  async findUserByEmailExcludingId(email: string, excludeUserId: string) {
    return User.findOne({
      email,
      _id: { $ne: excludeUserId },
    });
  },

  async findUserByPhoneExcludingId(phone: string, excludeUserId: string) {
    return User.findOne({
      phone,
      _id: { $ne: excludeUserId },
    });
  },

  async findUserByEmail(email: string) {
    return User.findOne({ email });
  },

  async findUserByPhone(phone: string) {
    return User.findOne({ phone });
  },

  async findUserById(userId: string) {
    return User.findById(userId);
  },

  async findByIdentifier(identifier: string) {
    return User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });
  },

  async findBySocialId(socialId: string) {
    return User.findOne({ socialId });
  },

  async checkExistingUser(email: string, phone: string) {
    return User.findOne({
      $or: [{ email }, { phone }],
    });
  },

  async createUser(data: Partial<IUser>) {
    return User.create(data);
  },

  async updateUserById(id: string, update: Partial<IUser>) {
    return User.findByIdAndUpdate(id, update, { new: true });
  },

  updateKYCStatus(userId: string, status: string) {
    return User.findByIdAndUpdate(
      userId,
      { kycStatus: status },
      { new: true }
    );
  },

  findByIdLean(userId: string) {
    return User.findById(userId).lean();
  },

  async changePassword(id: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
  },

  // -------------------------
  // ✔ Added CRUD Functionality
  // -------------------------

  // Get all users
async getAllUsers() {
  // 1️⃣ Fetch all users
  const users = await User.find().sort({ createdAt: -1 }).lean();

  // 2️⃣ Get all unique role IDs from users (excluding null)
  const roleIds = users
    .map(u => u.user_role)
    .filter(Boolean)
    .map(id => id);

  // 3️⃣ Fetch ALL roles (not only user roles)
  const roles = await Role.find().lean();

  // 4️⃣ Fetch all UserModules (for all roles)
  const userModulesList = await UserModules.find().lean();

  // 5️⃣ Collect all module IDs
  const moduleIds = userModulesList.flatMap(um =>
    (um.module_id ?? []).map((m: any) => m.toString())
  );

  // 6️⃣ Fetch all modules
  const modules = await Module.find({ _id: { $in: moduleIds } }).lean();

  // 7️⃣ Build modules map
  const modulesMap = new Map<string, any>();
  modules.forEach(mod => modulesMap.set(mod._id.toString(), mod));

  // 8️⃣ Build roleId → modules[] map
  const roleModulesMap = new Map<string, any[]>();
  userModulesList.forEach(um => {
    const mods = (um.module_id || [])
      .map((m: any) => modulesMap.get(m.toString()))
      .filter(Boolean);

    roleModulesMap.set(um.user_group_id.toString(), mods);
  });

  // 9️⃣ Build roleId → roleWithModules map
  const rolesMap = new Map<string, any>();
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
    totalItems:users.length
  };
},

  // Get user by ID
  async getUserById(id: string) {
    const user=await User.findById(id);
    console.log(user);
    return user;
    
  },
  async getsearch(search: string): Promise<IUser[]> {
    if (!search || search.trim() === "") {
      return []; // or throw new Error("Search string is required");
    }

    const users = await User.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ],
    });

    return users;
  },


  // Create user (already exists, but adding alias if needed)
  async createNewUser(data: Partial<IUser>) {
    return User.create(data);
  },

  // Update user by ID
  async updateUser(id: string, data: Partial<IUser>) {
    return User.findByIdAndUpdate(id, data, { new: true });
  },

  // Delete user by ID
  async deleteUser(id: string) {
    return User.findByIdAndDelete(id);
  },
};
