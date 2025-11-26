import { Types } from "mongoose";
import { KYCSTATUS } from "../Kyc/KycStatus";
import { IKYCDocument } from "../Kyc/Kycdocument";
import { UserRole } from "../Roles/UserRole";
export interface IUser extends Document {
    _id: Types.ObjectId;
    fullName: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    password: string;
    bio: string;
    documents?: IKYCDocument[];
    roles?: UserRole[];
    user_role?: Types.ObjectId | null;
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
    __v?: number;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
    LogoutTime: string;
    LogoutDate: Date;
    LoginTime: string;
    LoginDate: Date;
    duration: string;
}
//# sourceMappingURL=User.d.ts.map