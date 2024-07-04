import { createSigner, createVerifier } from "fast-jwt";
import { appConfig } from "@/config/app.config";

class Jwt {
  private static secretKey = appConfig.JWT_SECRET as string;
  private static jwtIssuer = appConfig.JWT_ISSUER;

  async sign(payload: Object, expiresIn: number) {
    const signer = createSigner({
      key: Jwt.secretKey,
      iss: Jwt.jwtIssuer,
      expiresIn,
    });

    return signer(payload);
  }

  async decode(token: string) {
    const decoder = createVerifier({
      key: Jwt.secretKey,
      allowedIss: Jwt.jwtIssuer,
    });

    return await decoder(token);
  }
}

const jwt = new Jwt();

export { jwt };
