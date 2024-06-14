import { appConfig } from '@/config/app.config';
import start from '@/server';

start(Number(appConfig.PORT), appConfig.HOST);
