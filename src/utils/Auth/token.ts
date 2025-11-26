import jwt from "jsonwebtoken";
export const generateAccessToken = (id: string, ) =>
  jwt.sign({ id }, process.env.JWT_ACCESS_SECRET!, { expiresIn: "1h" });

export const generateRefreshToken = (id: string) =>
  jwt.sign({ id}, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });

export const generateEmailVerificationToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_ACCESS_SECRET!, { expiresIn: "30d" });
