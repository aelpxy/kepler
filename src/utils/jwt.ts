import * as JsonWebToken from 'jsonwebtoken';
import { appConfig } from '@/config/app.config';

interface JwtPayload {
    userId: string;
    role: string;
}

class Jwt {
    private static secretKey = appConfig.JWT_SECRET as string;
    private static jwtIssuer = appConfig.JWT_ISSUER;

    public async generateJwtToken(
        payload: JwtPayload,
        expiresIn: string
    ): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            JsonWebToken.sign(
                payload,
                Jwt.secretKey,
                { expiresIn: expiresIn, issuer: Jwt.jwtIssuer },
                (error: Error | null, token?: string) => {
                    if (error) {
                        reject(new Error(error.message));
                    } else {
                        if (token) {
                            resolve(token);
                        } else {
                            reject(new Error('Token could not be generated'));
                        }
                    }
                }
            );
        });
    }

    public async verifyJwtToken(token: string): Promise<JwtPayload> {
        return new Promise<JwtPayload>((resolve, reject) => {
            JsonWebToken.verify(
                token,
                Jwt.secretKey,
                {
                    issuer: Jwt.jwtIssuer,
                },
                (error: Error | null, decoded?: object | string) => {
                    if (error) {
                        reject(new Error(error.message));
                    } else {
                        if (typeof decoded === 'string') {
                            reject(new Error('Token could not be verified'));
                        } else {
                            resolve(decoded as JwtPayload);
                        }
                    }
                }
            );
        });
    }
}

const jwt = new Jwt();

export { jwt };
