import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_PRIVATE_KEY,
  ADMIN_ACCESS_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PRIVATE_KEY,
  ADMIN_REFRESH_TOKEN_PRIVATE_KEY,
} from "./jwtKeys.js";
import { env } from "../config/env.js";

export const tokenCreation = (user) => {
  const payload = {
    _id: user._id,
    role: user.role,
  };

  const accessTokenExpiresIn = env.ACCESS_TOKEN_EXPIRES_IN;
  console.log('accessToken will expire in ', env.ACCESS_TOKEN_EXPIRES_IN)
  const refreshTokenExpiresIn = env.REFRESH_TOKEN_EXPIRES_IN;
  console.log('refresh token will expire in ',env.REFRESH_TOKEN_EXPIRES_IN);

  const getAccessToken = () =>
    jwt.sign(payload, ACCESS_TOKEN_PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: accessTokenExpiresIn,
    });
  const getRefreshToken = () =>
    jwt.sign(payload, REFRESH_TOKEN_PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: refreshTokenExpiresIn,
    });

  return { getAccessToken, getRefreshToken };
};

export const adminTokenCreation = (admin) => {
  const payload = {
    _id: admin._id,
    role: admin.role,
  };
  const adminAccessTokenExpiresIn = env.ADMIN_ACCESS_TOKEN_EXPIRES_IN;
  console.log('admin access token expires in ', env.ADMIN_ACCESS_TOKEN_EXPIRES_IN)
  const adminRefreshTokenExpiresIn = env.ADMIN_REFRESH_TOKEN_EXPIRES_IN;
  console.log('admin refresh token expires in ', env.ADMIN_REFRESH_TOKEN_EXPIRES_IN);
  
  const getAdminAccessToken = () =>
    jwt.sign(payload, ADMIN_ACCESS_TOKEN_PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: adminAccessTokenExpiresIn,
    });

  const getAdminRefreshToken = () =>
    jwt.sign(payload, ADMIN_REFRESH_TOKEN_PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: adminRefreshTokenExpiresIn,
    });

  return { getAdminAccessToken, getAdminRefreshToken };
};
