// types/IKYCRepo.ts
import { Document } from "mongoose";

export interface IKYCRepo {
  findByUserId(userId: string): Promise<any>;
  fetchKycDocuments(userId: string): Promise<any>;
  findOneByUser(userId: string): Promise<any>;
  findLatestByUser(userId: string): Promise<any>;
  createEmpty(userId: string): any;
  findById(kycId: string): Promise<any>;
  findByIdWithUser(kycId: string): Promise<any>;
  deleteById(kycId: string): Promise<any>;
  deleteAllByUser(userId: string): Promise<any>;
  save(kyc: any): Promise<any>;
}
