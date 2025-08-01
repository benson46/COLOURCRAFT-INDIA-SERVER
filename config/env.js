export const env = {
  // Development
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  
  // Mongodb
  MONGO_URI: process.env.MONGO_URI,
  
  // JWT
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
  ADMIN_ACCESS_TOKEN_EXPIRES_IN: process.env.ADMIN_ACCESS_TOKEN_EXPIRES_IN,
  ADMIN_REFRESH_TOKEN_EXPIRES_IN: process.env.ADMIN_REFRESH_TOKEN_EXPIRES_IN,
  
  // Google account
  APP_USERNAME: process.env.APP_USERNAME,
  APP_PASSWORD: process.env.APP_PASSWORD,
  
  // Cloudinary
  CLOUDINARY_NAME : process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET
};
