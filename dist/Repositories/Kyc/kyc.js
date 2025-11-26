"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KYCRepo = void 0;
const kyc_model_1 = require("../../Models/kyc.model");
const kychelper_1 = require("./kychelper");
exports.KYCRepo = {
    findByUserId(userId) {
        return kyc_model_1.KYC.find({ userId }).sort({ createdAt: -1 }).lean();
    },
    fetchKycDocuments(userId) {
        return (0, kychelper_1.getLatestKyc)(userId);
    },
    findOneByUser(userId) {
        return kyc_model_1.KYC.findOne({ userId });
    },
    findLatestByUser(userId) {
        return kyc_model_1.KYC.findOne({ userId }).sort({ createdAt: -1 }).lean();
    },
    createEmpty(userId) {
        return new kyc_model_1.KYC({
            userId,
            documents: [],
            overallStatus: "pending",
        });
    },
    findById(kycId) {
        return kyc_model_1.KYC.findById(kycId);
    },
    findByIdWithUser(kycId) {
        return kyc_model_1.KYC.findById(kycId).populate("userId", "fullName email phone kycStatus");
    },
    deleteById(kycId) {
        return kyc_model_1.KYC.findByIdAndDelete(kycId);
    },
    deleteAllByUser(userId) {
        return kyc_model_1.KYC.deleteMany({ userId });
    },
    save(kyc) {
        return kyc.save();
    },
};
