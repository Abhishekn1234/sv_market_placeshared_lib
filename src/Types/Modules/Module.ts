import { Types ,Document} from "mongoose";
export interface IModule {
  _id: Types.ObjectId|string;
  module: string;
  modulelanguagekey: string;
  sort: number;
  parent: string;
  // URL?: string;       // optional if exists
  // alinkColor?: string; // optional
  // all?: any;          // optional for extra data
}




