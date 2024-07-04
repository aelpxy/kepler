import { createSigner, createVerifier } from 'fast-jwt';
import { appConfig } from '@/config/app.config';

class JsonWebToken {
    private secretKey = appConfig.JWT_SECRET as string;
    private jwtIssuer = appConfig.JWT_ISSUER;

    async sign(payload: Object, expiresIn: number) {
        const signer = createSigner({
            key: this.secretKey,
            iss: this.jwtIssuer,
            expiresIn,
        });

        return signer(payload);
    }

    async decode(token: string) {
        const decoder = createVerifier({
            key: this.secretKey,
            allowedIss: this.jwtIssuer,
        });

        return await decoder(token);
    }
}

export const jwt = new JsonWebToken();
