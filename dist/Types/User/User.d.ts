import { Types } from "mongoose";
import { KYCSTATUS } from "../Kyc/KycStatus";
import { IKYCDocument } from "../Kyc/Kycdocument";
import { UserRole } from "../Roles/UserRole";
export interface IUser {
    _id: Types.ObjectId;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    bio: string;
    documents?: IKYCDocument[];
    user_role?: Types.ObjectId | UserRole | null;
    isVerified: boolean;
    kycStatus: KYCSTATUS;
    nationality: string;
    dob: Date;
    profilePictureUrl: string;
    profilePicturePublicId: string;
    address: string;
    social?: {
        provider?: string;
        socialId?: string;
    };
    matchPassword(password: string): Promise<boolean>;
    otp?: string;
    otpExpire?: Date;
    emailVerificationToken?: string;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    LoginTime?: string;
    LoginDate?: Date;
    LogoutTime?: string;
    LogoutDate?: Date;
    duration?: string;
    createdAt: Date;
    updatedAt: Date;
    __v?: number;
}
//# sourceMappingURL=User.d.ts.map