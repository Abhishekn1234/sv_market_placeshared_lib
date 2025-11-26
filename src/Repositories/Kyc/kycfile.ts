import { IUser } from "../../Types/User/User";
import { KYCFileType } from "../../Types/Kyc/kycfiletype";
import { KYCFileCategory } from "../../Types/Kyc/kycfilecategory";
import { Express } from "express";
import { IKYCDocument } from "../../Types/Kyc/Kycdocument";

export const KYCMapper = {
  mapUser(user: IUser | any) {
    if (!user) return null;

    const { __v, createdAt, updatedAt, ...rest } = user;
    return rest;
  },

  mapDocuments(documents: IKYCDocument[]) {
    return documents.map((doc) => ({
      category: doc.category,
      documentType: doc.documentType,
      fileName: doc.fileName,
      publicId: doc.publicId,
      filePath: doc.filePath,
      fileType: doc.fileType,
      uploadedAt: doc.uploadedAt,
      remarks: doc.remarks,
    }));
  },

  mapKYC(kyc: any) {
    return {
      _id: kyc._id,
      nationality: kyc.nationality,
      address: kyc.address,
      overallStatus: kyc.overallStatus,
      remarks: kyc.remarks,
      user: this.mapUser(kyc.userId),
      documents: this.mapDocuments(kyc.documents || []),
    };
  },

  mapFileToKYC(file: Express.Multer.File): { category: KYCFileCategory; documentType: KYCFileType } {
    let category: KYCFileCategory = "photoProof";
    let documentType: KYCFileType = "other";

    if (file.fieldname.includes("id")) {
      category = "idProof";
      documentType = "identity";
    } else if (file.fieldname.includes("address")) {
      category = "addressProof";
      documentType = "address";
    }

    return { category, documentType };
  },
};

// Standalone function for a simplified KYC response
export const formatKycResponse = (kyc: any) => ({
  documents: (kyc.documents || []).map((doc: IKYCDocument) => ({
    category: doc.category,
    documentType: doc.documentType,
    fileName: doc.fileName,
    filePath: doc.filePath,
    fileType: doc.fileType,
    uploadedAt: doc.uploadedAt,
  })),
  overallStatus: kyc.overallStatus,
});
export const mergeMulterFiles = (
  filesObj: Record<string, Express.Multer.File[]> | undefined
): Express.Multer.File[] => {

  const filesArray: Express.Multer.File[] = [];

  if (!filesObj) return filesArray;

  Object.values(filesObj).forEach((arr) => {
    filesArray.push(...arr);
  });

  return filesArray;
};

