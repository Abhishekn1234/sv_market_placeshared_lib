"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildUserResponse = void 0;
const kychelper_1 = require("../Kyc/kychelper");
const buildUserResponse = (user, kycDocuments, role, modules) => {
    const sanitizedUser = (0, kychelper_1.sanitizeUser)(user.toObject());
    delete sanitizedUser.user_role;
    return {
        ...sanitizedUser,
        documents: kycDocuments ?? [],
        role: role
            ? {
                ...role,
                modules: modules ?? [],
            }
            : null,
    };
};
exports.buildUserResponse = buildUserResponse;
