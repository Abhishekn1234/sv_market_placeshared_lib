import { Types ,Document} from "mongoose";
export interface IModule extends Document {
  _id: Types.ObjectId;
  module: string;
  modulelanguagekey: string;
  sort: number;
  parent: string;
  // URL?: string;       // optional if exists
  // alinkColor?: string; // optional
  // all?: any;          // optional for extra data
}




