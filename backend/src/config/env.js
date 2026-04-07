import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 8080),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    database: process.env.DB_NAME || 'Vantalog_bd',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  },
  defaultAdmin: {
    name: process.env.DEFAULT_ADMIN_NAME || 'Vantalog Admin',
    email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@vantalog.local',
    password: process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123',
  },
};
