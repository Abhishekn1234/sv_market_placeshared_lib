import { IKYCDocument } from "../Kyc/Kycdocument";
import { IUser } from "./User";
import { UserRole } from "../Roles/UserRole";
export interface UpdateUserResponse extends IUser {
    documents?: IKYCDocument[];
    role?: UserRole | null;
}
//# sourceMappingURL=updatedUserResponse.d.ts.map