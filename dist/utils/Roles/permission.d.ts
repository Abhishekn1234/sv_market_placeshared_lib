import { Types } from "mongoose";
export declare function checkModuleAccess(userId: string, moduleKey: string): Promise<boolean>;
export declare const normalizeRole: (role: Types.ObjectId | string | null | undefined) => string;
export declare const checkModuleAcces: (moduleName: string, role: Types.ObjectId | string | null | undefined) => Promise<boolean>;
//# sourceMappingURL=permission.d.ts.map