import { SignOptions, sign, verify } from 'jsonwebtoken';
import 'dotenv/config';
import { LoginData } from '../interfaces/ILogin';

const { JWT_SECRET } = process.env;

export default class JWT {
  static generateToken(payload: Omit<LoginData, 'password'>) {
    const signInOpions: SignOptions = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };

    const token = sign(payload, String(JWT_SECRET), signInOpions);
    return token;
  }

  static validateToken(token: string) {
    const payload = verify(token, String(JWT_SECRET));
    return payload;
  }
}
