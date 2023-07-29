require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8000,
  cloudDb: process.env.CLOUD_MONGO_URL,
  localDb: process.env.LOCAL_MONGO_URL,
  jwtPK: process.env.JWT_PRIVATE_KEY,
  requiresAuth: process.env.REQUIRES_AUTH || false,
};
