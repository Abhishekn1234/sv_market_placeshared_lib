import { IKYCDocument } from "./Kycdocument"; // or wherever it's located

export type KycLean = Omit<IKYCDocument, "__v" | "createdAt" | "updatedAt" | "overallStatus" | "userId">;
export type KycLeanWithDocuments = KycLean & {
  documents: IKYCDocument[]; // explicitly define documents array
};

