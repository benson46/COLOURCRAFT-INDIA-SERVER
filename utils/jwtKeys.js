import fs from "fs";
import path from "path";

// Access Token
export const ACCESS_TOKEN_PRIVATE_KEY = fs.readFileSync(
  path.resolve("SERVER/../keys/accessTokenPrivateKey.pem"),
  "utf-8"
);
export const ACCESS_TOKEN_PUBLIC_KEY = fs.readFileSync(
  path.resolve("SERVER/../keys/accessTokenPublicKey.pem"),
  "utf-8"
);
export const ADMIN_ACCESS_TOKEN_PRIVATE_KEY = fs.readFileSync(
  path.resolve("SERVER/../keys/accessTokenPrivateKey.pem"),
  "utf-8"
);
export const ADMIN_ACCESS_TOKEN_PUBLIC_KEY = fs.readFileSync(
  path.resolve("SERVER/../keys/accessTokenPublicKey.pem"),
  "utf-8"
);

// Refresh Token
export const REFRESH_TOKEN_PRIVATE_KEY = fs.readFileSync(
  path.resolve("SERVER/../keys/refreshTokenPrivateKey.pem"),
  "utf-8"
);
export const REFRESH_TOKEN_PUBLIC_KEY = fs.readFileSync(
  path.resolve("SERVER/../keys/refreshTokenPublicKey.pem"),
  "utf-8"
);
export const ADMIN_REFRESH_TOKEN_PRIVATE_KEY = fs.readFileSync(
  path.resolve("SERVER/../keys/refreshTokenPrivateKey.pem"),
  "utf-8"
);
export const ADMIN_REFRESH_TOKEN_PUBLIC_KEY = fs.readFileSync(
  path.resolve("SERVER/../keys/refreshTokenPublicKey.pem"),
  "utf-8"
);
