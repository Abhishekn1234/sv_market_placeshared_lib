import { IUserModules } from "../../Types/UserModule/UserModule";
import { Types } from "mongoose";
import { IModule } from "../../Types/Modules/Module";
export declare class UserModuleService {
    static findAllUserModules(): Promise<IUserModules[]>;
    static getUserWithRoleAndModules(userId: string): Promise<{
        roleDetails: import("mongoose").Document<unknown, {}, import("../..").UserRole, {}, {}> & import("../..").UserRole & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        };
        modules: IModule[];
        _id: Types.ObjectId;
        fullName: string;
        email: string;
        phone: string;
        password: string;
        bio: string;
        documents?: import("../..").IKYCDocument[];
        user_role?: Types.ObjectId | import("../..").UserRole | null;
        isVerified: boolean;
        kycStatus: import("../../Types/Kyc/KycStatus").KYCSTATUS;
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
    }>;
    static createOrUpdateUserModule(user_group_id: string, module_id: string, dataToUpdate?: Partial<IUserModules>): Promise<IUserModules>;
    static createUserModule(user_group_id: string, module_id: string): Promise<IUserModules>;
    static findUserModuleById(id: string): Promise<IUserModules | null>;
    static findUserModuleByGroupAndModule(user_group_id: string, module_id: string): Promise<IUserModules | null>;
    static updateUserModuleById(id: string, updateData: Partial<IUserModules>): Promise<IUserModules | null>;
    static deleteUserModuleById(id: string): Promise<IUserModules | null>;
    static getAllUserModules(): Promise<(import("mongoose").Document<unknown, {}, IUserModules, {}, {}> & IUserModules & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    static getUserModuleByRoleId(roleId: string): Promise<(import("mongoose").Document<unknown, {}, IUserModules, {}, {}> & IUserModules & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    static updateUserModulesByRoleId(roleId: string, module_ids: string[]): Promise<import("mongoose").UpdateWriteOpResult>;
    static deleteUserModulesByRoleId(roleId: string): Promise<import("mongodb").DeleteResult>;
}
//# sourceMappingURL=usermodule.d.ts.map