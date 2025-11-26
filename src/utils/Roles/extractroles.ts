import { IUser } from "../../Types/User/User";
// 🟦 Extract Role Name from user.roles
export const extractRoleName = (roles: IUser["user_role"]): null | string => {
  if (roles && typeof roles === "object" && "name" in roles) return null;
  return null; // fallback default
};

export const RoleNameRegex = /^[A-Za-z ]+$/;

export const PERMISSION_REGEX = /^[A-Za-z_]+$/;
