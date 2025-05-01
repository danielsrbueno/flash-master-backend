import { get } from 'env-var';
import * as dotenv from 'dotenv';
dotenv.config();

export const ENVIRONMENT = {
  PORT: get('PORT').default(3000).asPortNumber(),
  DATABASE_URL: get('DATABASE_URL').required().asString(),

  JWT: {
    // PRIVATE_KEY: get('JWT_PRIVATE_KEY').required().asString(),
    // PUBLIC_KEY: get('JWT_PUBLIC_KEY').required().asString(),
    SECRET_KEY: get('JWT_SECRET').required().asString(),
    EXPIRES_IN: get('JWT_EXPIRES_IN').required().asString(),
  },
};
