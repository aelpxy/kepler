import { appConfig } from '@/config/app.config';
import { logger } from '@/utils/logger';
import { Redis } from 'ioredis';

const redisInstance = new Redis(appConfig.REDIS_URL as string);

redisInstance.on('connect', () => {
    logger.info('Connected to Redis');
});

redisInstance.on('error', (error) => {
    logger.error(error);
    process.exit(1);
});

export default redisInstance;
