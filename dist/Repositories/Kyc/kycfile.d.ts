import { IUser } from "../../Types/User/User";
import { KYCFileType } from "../../Types/Kyc/kycfiletype";
import { KYCFileCategory } from "../../Types/Kyc/kycfilecategory";
import { IKYCDocument } from "../../Types/Kyc/Kycdocument";
export declare const KYCMapper: {
    mapUser(user: IUser | any): any;
    mapDocuments(documents: IKYCDocument[]): {
        category: string;
        documentType: string;
        fileName: string;
        publicId: string;
        filePath: string;
        fileType: string;
        uploadedAt: Date | undefined;
        remarks: string | undefined;
    }[];
    mapKYC(kyc: any): {
        _id: any;
        nationality: any;
        address: any;
        overallStatus: any;
        remarks: any;
        user: any;
        documents: {
            category: string;
            documentType: string;
            fileName: string;
            publicId: string;
            filePath: string;
            fileType: string;
            uploadedAt: Date | undefined;
            remarks: string | undefined;
        }[];
    };
    mapFileToKYC(file: Express.Multer.File): {
        category: KYCFileCategory;
        documentType: KYCFileType;
    };
};
export declare const formatKycResponse: (kyc: any) => {
    documents: any;
    overallStatus: any;
};
export declare const mergeMulterFiles: (filesObj: Record<string, Express.Multer.File[]> | undefined) => Express.Multer.File[];
//# sourceMappingURL=kycfile.d.ts.map