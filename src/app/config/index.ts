import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,

  port: process.env.PORT,

  front_end_url: process.env.FRONTEND_URL,

  database_url: process.env.DATABASE_URL,

  contact_email: process.env.CONTACT_EMAIL,

  password_salt: process.env.PASSWORD_SALT_ROUNDS,

  email: {
    email_user: process.env.EMAIL_USER,
    email_password: process.env.EMAIL_PASSWORD,
    email_host: process.env.EMAIL_HOST,
    email_port: process.env.EMAIL_PORT,
    email_from_name: process.env.EMAIL_FROM_NAME,
  },

  jwt: {
    jwt_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwt_expires_in: process.env.JWT_ACCESS_EXPIRATION,
    jwt_refresh_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRATION,
  },

  passwordReset: {
    secret: process.env.PASSWORD_RESET_TOKEN,
    expiration: process.env.PASSWORD_RESET_EXPIRATION,
  },

  emailVerification: {
    token: process.env.EMAIL_VERIFICATION_TOKEN,
    expiration: process.env.EMAIL_VERIFICATION_EXPIRATION,
  },

  cloudinary: {
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};
