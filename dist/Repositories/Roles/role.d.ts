import { UserRole } from "../../Types/Roles/UserRole";
import { IModule } from "../../Types/Modules/Module";
import { Types } from "mongoose";
export declare class Rolefunctions {
    static updateRole(id: string, data: Partial<UserRole>): Promise<(import("mongoose").Document<unknown, {}, UserRole, {}, {}> & UserRole & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    static deleteRole(id: string): Promise<(import("mongoose").Document<unknown, {}, UserRole, {}, {}> & UserRole & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    static fetchRoleById(id: string): Promise<{
        _id: Types.ObjectId;
        name: string;
        modules: IModule[];
    } | null>;
    static fetchByNames(name: string): Promise<(import("mongoose").Document<unknown, {}, UserRole, {}, {}> & UserRole & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    static fetchRolesWithModules(): Promise<UserRole[]>;
    static fetchRoles(): Promise<(import("mongoose").Document<unknown, {}, UserRole, {}, {}> & UserRole & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    static addRoles(name: string): Promise<UserRole>;
}
//# sourceMappingURL=role.d.ts.map