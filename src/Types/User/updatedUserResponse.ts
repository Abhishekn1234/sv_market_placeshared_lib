import { IKYCDocument } from "../Kyc/Kycdocument";
import { IUser } from "./User";
import { UserRole } from "../Roles/UserRole";

export interface UpdateUserResponse extends IUser {
  documents: IKYCDocument[];     // populated KYC documents
  role: UserRole | null;         // populated role object
}
