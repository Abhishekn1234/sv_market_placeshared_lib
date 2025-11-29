import mongoose, { Schema, Types } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../Types/User/User";

// Schema methods interface
export interface IUserMethods {
  matchPassword(password: string): Promise<boolean>;
}

// Schema
const userSchema = new Schema<IUser, {}, IUserMethods>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, default: "" },
    user_role: { type: Types.ObjectId, ref: "UserRole", default: null },
   documents: [
  {
    type: Types.ObjectId,
    ref: "KYC"
  }
],
    isVerified: { type: Boolean, default: false },
    kycStatus: {
      type: String,
      enum: ["pending", "verified", "rejected", "not_submitted", "submitted"],
      default: "not_submitted",
    },
    nationality: { type: String },
    dob: { type: Date },
    profilePictureUrl: { type: String, default: "" },
    profilePicturePublicId: { type: String, default: "" },
    address: { type: String, default: "" },
    social: { provider: String, socialId: String },
    otp: String,
    otpExpire: Date,
    emailVerificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    LoginTime: String,
    LoginDate: Date,
    LogoutTime: String,
    LogoutDate: Date,
    duration: String,
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Instance method
userSchema.methods.matchPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

// Export model
export const User = mongoose.model<IUser, mongoose.Model<IUser, {}, IUserMethods>>(
  "User",
  userSchema
);
