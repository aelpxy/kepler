import { config } from 'dotenv';
import crypto from 'crypto';
import os from 'os';

config();

const appConfig = {
    ENVIRONMENT: process.env.NODE_ENV,
    PORT: process.env.PORT || 8080,
    HOST: process.env.HOST || '0.0.0.0',
    ORIGIN: process.env.ORIGIN || '*',
    EPOCH: 1706677310,
    MACHINE_ID:
        BigInt(
            `0x${crypto.createHash('sha256').update(os.hostname()).digest('hex')}`
        ) & 0xfffn,
    SEQUENCE_MASK: 0xfffn,

    JWT_ISSUER: 'kepler',
    JWT_SECRET: process.env.JWT_SECRET,

    REDIS_URL: process.env.REDIS_URL,
    DATABASE_URL: process.env.DATABASE_URL,

    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,

    S3_ENDPOINT: process.env.S3_ENDPOINT,
    S3_REGION: process.env.S3_REGION,
    S3_BUCKET: process.env.S3_BUCKET,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_ACCESS_SECRET_KEY: process.env.S3_ACCESS_SECRET_KEY,
};

export { appConfig };
