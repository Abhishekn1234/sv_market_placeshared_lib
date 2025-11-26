import { IKYCDocument } from "../Kyc/Kycdocument";
import { IUser } from "./User";
export interface RegisterUserResponse {
    user: IUser & {
        documents: IKYCDocument[];
        kycStatus: string;
        roleName: string;
    };
    accessToken: string;
    refreshToken: string;
}
//# sourceMappingURL=RegisterUserResponse.d.ts.map