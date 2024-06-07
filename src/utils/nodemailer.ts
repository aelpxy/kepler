import nodemailer from 'nodemailer';

import { APP_CONSTANTS } from '@/config/app.config';

const transporter = nodemailer.createTransport({
    host: APP_CONSTANTS.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
        user: APP_CONSTANTS.SMTP_USER,
        pass: APP_CONSTANTS.SMTP_PASSWORD,
    },
});

export default { transporter };
