export interface IKYCDocument {
  _id?: string;
  category: string;
  documentType:string;
   fileName: string;
   publicId: string,
  filePath: string;
  fileType: string;
  uploadedAt?: Date;
 
  remarks?: string;
}