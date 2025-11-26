import { KycLean } from "../../Types/Kyc/kyclean";
export declare const validateIdentifier: (identifier: string) => void;
export declare const generateTokens: (id: string) => {
    accessToken: string;
    refreshToken: string;
};
export declare const sanitizeUser: (userObj: any) => any;
export declare const getLatestKyc: (userId: string) => Promise<KycLean | null>;
export declare const filterAllowedUpdates: (data: any, allowed: string[]) => any;
//# sourceMappingURL=kychelper.d.ts.map