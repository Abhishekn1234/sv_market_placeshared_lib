import { IKYCDocument } from "../Kyc/Kycdocument";
import { IUser } from "./User";
import { IModule } from "../Modules/Module";
import { UserRole } from "../Roles/UserRole";
export interface LoginUserResponse {
    user: IUser & {
        documents: IKYCDocument[];
        roles: UserRole | null;
        modules: IModule[];
        kycStatus: string;
        roleName: string;
    };
    accessToken: string;
    refreshToken: string;
}
//# sourceMappingURL=LoginUserResponse.d.ts.map