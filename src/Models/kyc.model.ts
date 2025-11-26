import mongoose, { Document, Schema } from "mongoose";
import { IKYCDocument } from "../Types/Kyc/Kycdocument";
import { IKYC } from "../Types/Kyc/Kyc";
const kycDocumentSchema = new Schema<IKYCDocument>(
  {
    category: {
      type: String,
      
      
    },

    documentType: {
      type: String,
     
      
    },

    fileName: { type: String, required: true },
    filePath: { type: String, required: true },

    fileType: {
      type: String,
      required: true,
      enum: [
        "image/jpeg",
        "image/png",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
    },

    uploadedAt: { type: Date, default: Date.now },

   

    remarks: { type: String },
  },
  { _id: false }
);



const kycSchema = new Schema<IKYC>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    nationality: {
      type: String,
      enum: ["Saudi", "GCC", "Other"],
    },

    address: {
      street: { type: String },
      city: { type: String },
      region: { type: String },
      postalCode: { type: String },
    },

    documents: [kycDocumentSchema],

    overallStatus: {
      type: String,
      enum: ["pending", "verified", "rejected", "approved","not_submitted","submitted"],
      default: "pending",
    },

    remarks: { type: String },

    emailVerificationToken: { type: String },

    userInfoSnapshot: {
      fullName: { type: String },
      email: { type: String },
      phone: { type: String },
      bio: { type: String },
      address:{type:String},
      profilePictureUrl:{type:String}
    },
  },
  { timestamps: true }
);

export const KYC = mongoose.model<IKYC>("KYC", kycSchema);
