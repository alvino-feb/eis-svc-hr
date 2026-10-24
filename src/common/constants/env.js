import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    PORT: process.env.PORT,

    JWT: {
        ACCESS_KEY: process.env.JWT_ACCESS_KEY,
        REFRESH_KEY: process.env.JWT_REFRESH_KEY
    },

    SALT_ROUND: process.env.SALT_ROUND || 10
}
