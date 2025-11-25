import { Types, Document } from "mongoose";
export interface IModule extends Document {
    _id: Types.ObjectId;
    module: string;
    modulelanguagekey: string;
    sort: number;
    parent: string;
    URL?: string;
    alinkColor?: string;
    all?: any;
}
export interface IUserModulesResponse {
    _id: string;
    module: string;
    modulelanguagekey: string;
    sort: number;
    parent: string;
}
export interface UserRoleResponse {
    _id: string;
    name: string;
    modules: IUserModulesResponse[];
}
//# sourceMappingURL=Module.d.ts.map