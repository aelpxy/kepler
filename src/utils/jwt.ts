import * as JsonWebToken from 'jsonwebtoken';
import { appConfig } from '@/config/app.config';

class Jwt {
    private static secretKey: string = appConfig.JWT_SECRET as string;
    private static jwtIssuer: string = appConfig.JWT_ISSUER as string;

    public async generateJwtToken(
        payload: object,
        expiresIn: string
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            JsonWebToken.sign(
                payload,
                Jwt.secretKey,
                { expiresIn: expiresIn, issuer: Jwt.jwtIssuer },
                (error, token: any) => {
                    if (error) {
                        reject(new Error(error as any));
                    } else {
                        resolve(token);
                    }
                }
            );
        });
    }

    public async verifyJwtToken(token: string): Promise<any> {
        return JsonWebToken.verify(token, Jwt.secretKey, {
            issuer: Jwt.jwtIssuer,
        });
    }
}

const jwt = new Jwt();

export { jwt };
