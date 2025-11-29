
import { sanitizeUser } from "../Kyc/kychelper";
import { UserRole } from "../../Types/Roles/UserRole";
import { IModule } from "../../Types/Modules/Module";
import { UpdateUserResponse } from "../../Types/User/updatedUserResponse";


export const buildUserResponse = (
  user: any,
  kycDocuments: any[],
  role: UserRole | null,
  modules: IModule[]
): UpdateUserResponse => {
  const sanitizedUser = sanitizeUser(user);
  delete sanitizedUser.user_role;

  return {
    ...sanitizedUser,
    documents: kycDocuments ?? [],
    role: role
      ? {
          ...role,
          modules: modules ?? [],
        }
      : null,
  };
};
