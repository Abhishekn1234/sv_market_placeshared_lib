import mongoose from "mongoose";
import { IModule } from "../Types/Modules/Module";
export declare const Module: mongoose.Model<IModule, {}, {}, {}, mongoose.Document<unknown, {}, IModule, {}, {}> & IModule & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=module.model.d.ts.map