import jwt from 'jsonwebtoken'
import createError from "../utils/createError.js";
import { ACCESS_TOKEN_PRIVATE_KEY, ADMIN_ACCESS_TOKEN_PRIVATE_KEY, ADMIN_REFRESH_TOKEN_PRIVATE_KEY, REFRESH_TOKEN_PRIVATE_KEY } from "../utils/jwtKeys.js";
import { userRepository } from '../repositories/usersRepository.js';
import { adminTokenCreation, tokenCreation } from '../utils/jwt.js';
import { env } from '../config/env.js';

export const verifyToken = (role = "user") => {
  return async (req, res, next) => {
    try {
      console.log(`[${role.toUpperCase()}] Incoming cookies:`, req.cookies);

      const accessToken =
        role === "admin" ? req.cookies.adminAccessToken : req.cookies.accessToken;

      const refreshToken =
        role === "admin" ? req.cookies.adminRefreshToken : req.cookies.refreshToken;

      const accessSecret =
        role === "admin"
          ? ADMIN_ACCESS_TOKEN_PRIVATE_KEY
          : ACCESS_TOKEN_PRIVATE_KEY;

      const refreshSecret =
        role === "admin"
          ? ADMIN_REFRESH_TOKEN_PRIVATE_KEY
          : REFRESH_TOKEN_PRIVATE_KEY;

      // 1. Try verifying Access Token
      if (accessToken) {
        try {
          const decoded = jwt.verify(accessToken, accessSecret, {
            algorithms: ["RS256"],
          });

          if(role === "admin"){
            await userRepository.find(decoded._id)
          }else{
            await userRepository.findUserById(decoded._id);
          }

          req.user = decoded;
          return next();
        } catch (err) {
          console.warn(`[${role.toUpperCase()}] Access Token Invalid: ${err.message}`);
        }
      } else {
        console.warn(`[${role.toUpperCase()}] Access Token missing.`);
      }

      // 2. Try verifying Refresh Token
      if (!refreshToken) {
        throw createError.Unauthorized("No refresh token. Please login again.");
      }

      try {
        const decodedRefresh = jwt.verify(refreshToken, refreshSecret, {
          algorithms: ["RS256"],
        });

        await userRepository.findUserById(decodedRefresh._id);

        console.log(`[${role.toUpperCase()}] Refresh Token verified. Generating new Access Token.`);

        // Generate correct new access token
        let newAccessToken = "";

        if (role === "admin" && decodedRefresh.role === "admin") {
          const { getAdminAccessToken } = adminTokenCreation(decodedRefresh);
          newAccessToken = getAdminAccessToken();
        } else if (role === "user" && decodedRefresh.role === "user") {
          const { getAccessToken } = tokenCreation(decodedRefresh);
          newAccessToken = getAccessToken();
        } else {
          throw createError.Unauthorized("Token role mismatch.");
        }

        const exp = Math.floor(Date.now() / 1000) + 15 * 60;
        console.log(`[${role.toUpperCase()}] New Access Token issued. Expires at:`, new Date(exp * 1000).toLocaleString());

        res.cookie(
          role === "admin" ? "adminAccessToken" : "accessToken",
          newAccessToken,
          {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000, // 15 mins
          }
        );

        req.user = decodedRefresh;


        return next();
      } catch (error) {
        console.error(`[${role.toUpperCase()}] Refresh Token verification failed:`, error.name, error.message);
        throw createError.Unauthorized("Invalid or expired refresh token.");
      }

    } catch (error) {
      console.error(`[${role.toUpperCase()}] Token verification failed:`, error.message);
      return next(createError.Unauthorized("Invalid or expired token."));
    }
  };
};
