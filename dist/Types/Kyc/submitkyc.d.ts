import { IUser } from "../User/User";
export interface SubmitKYCBody {
    nationality?: string;
    address?: {
        street?: string;
        city?: string;
        region?: string;
        postalCode?: string;
    };
    userInfoSnapshot?: Partial<Pick<IUser, "fullName" | "email" | "phone" | "bio" | "address" | "profilePictureUrl">>;
}
//# sourceMappingURL=submitkyc.d.ts.map