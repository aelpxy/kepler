import nodemailer from 'nodemailer';

import { appConfig } from '@/config/app.config';

const transporter = nodemailer.createTransport({
    host: appConfig.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
        user: appConfig.SMTP_USER,
        pass: appConfig.SMTP_PASSWORD,
    },
});

export { transporter };
