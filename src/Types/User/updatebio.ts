export interface UpdateBioData {
  fullName?: string;
  phone?: string;
  email?: string;
  dob?: Date | string;
  bio?: string;
  address?: string;
  profilePictureUrl?: string;
  nationality?: string;
  documents?:string[];
}