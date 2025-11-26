import { Types } from "mongoose";

export interface IUserModulesResponse {
   _id: string | Types.ObjectId;

    module: string;
    modulelanguagekey: string;
    sort: number;
    parent: string;
}
