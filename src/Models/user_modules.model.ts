import mongoose, {  Schema, Types } from "mongoose";

import { IUserModules } from "../Types/UserModule/UserModule";
const moduleSchema= new Schema<IUserModules>({
   user_group_id:{type:Schema.Types.ObjectId,ref:"UserRole"},
  module_id: [{
    type: Schema.Types.ObjectId,
    ref: "Module",
    required: true
  }]
 
});
export const UserModules=mongoose.model<IUserModules>("UserModules",moduleSchema);