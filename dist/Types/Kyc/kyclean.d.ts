import { IKYCDocument } from "./Kycdocument";
export type KycLean = Omit<IKYCDocument, "__v" | "createdAt" | "updatedAt" | "overallStatus" | "userId">;
export type KycLeanWithDocuments = KycLean & {
    documents: IKYCDocument[];
};
//# sourceMappingURL=kyclean.d.ts.map