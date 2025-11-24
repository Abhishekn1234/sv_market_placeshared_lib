import { User, IUser } from "../../Models/user.model";
import bcrypt from "bcryptjs";
import { Role } from "../../Models/user.role.model";
import { Types } from "mongoose";
import { UserModules } from "../../Models/user_modules.model";
import { Module } from "../../Models/module.model";

export const userRepo = {
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
async  getAllUsers () {
  // 1️⃣ Fetch all users
  const users = await User.find().sort({ createdAt: -1 }).lean();

  // 2️⃣ Collect all unique role IDs
  const roleIds = users.map(user => user.user_role).filter(Boolean) as Types.ObjectId[];

  // 3️⃣ Fetch all roles
  const roles = await Role.find({ _id: { $in: roleIds } }).lean();

  // 4️⃣ Fetch all UserModules for these roles
  const userModulesList = await UserModules.find({ user_group_id: { $in: roleIds } }).lean();

  // 5️⃣ Collect all module IDs
  const moduleIds = userModulesList.flatMap(
  um => (um.module_id ?? []) as Types.ObjectId[]
);


  // 6️⃣ Fetch all modules
  const modules = await Module.find({ _id: { $in: moduleIds } }).lean();

  // 7️⃣ Map module _id => module object
  const modulesMap = new Map<string, any>();
  modules.forEach(mod => modulesMap.set(mod._id.toString(), mod));

  // 8️⃣ Map roleId => modules array
  const roleModulesMap = new Map<string, any[]>();
  userModulesList.forEach(um => {
    const mods = (um.module_id || []).map(id => modulesMap.get(id.toString())).filter(Boolean);
    roleModulesMap.set(um.user_group_id.toString(), mods);
  });

  // 9️⃣ Map roleId => role object with modules injected
  const rolesMap = new Map<string, any>();
  roles.forEach(role => {
    rolesMap.set(role._id.toString(), {
      ...role,
      modules: roleModulesMap.get(role._id.toString()) || []
    });
  });

  // 🔟 Inject role with modules into each user
 const usersWithRoles = users.map(user => {
  const roleId = user.user_role?.toString(); 
  return {
    ...user,
    role: roleId ? rolesMap.get(roleId) : null
  };
});


  return usersWithRoles;
},

  // Get user by ID
  async getUserById(id: string) {
    return User.findById(id);
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
