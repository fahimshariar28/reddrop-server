import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  password_salt_: process.env.PASSWORD_SALT_ROUNDS,
  jwt_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwt_expires_in: process.env.JWT_ACCESS_EXPIRATION,
};
