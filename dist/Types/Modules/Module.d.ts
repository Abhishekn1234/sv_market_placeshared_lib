import { Types } from "mongoose";
export interface IModule {
    _id: Types.ObjectId | string;
    module: string;
    modulelanguagekey: string;
    sort: number;
    parent: string;
}
//# sourceMappingURL=Module.d.ts.map