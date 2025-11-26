import mongoose from "mongoose";
import { IKYCDocument } from "./Kycdocument";

export interface IKYC  {
  userId: mongoose.Schema.Types.ObjectId;

  nationality: "Saudi" | "GCC" | "Other";

  address: {
    street?: string;
    city?: string;
    region?: string;
    postalCode?: string;
  };

  userInfoSnapshot?: {
    fullName?: string;
    email?: string;
    phone?: string;
    bio?: string;
    address:string;
    profilePictureUrl:string;
  };

  documents: IKYCDocument[];

  overallStatus: "pending" | "verified" | "rejected" | "approved" |"not_submitted" |"submitted";

  remarks?: string;
  emailVerificationToken?: string;
}