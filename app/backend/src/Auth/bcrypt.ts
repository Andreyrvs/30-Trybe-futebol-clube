import * as bcrypt from 'bcryptjs';
import Unauthorized from '../errors/Unauthorized';

export default class Encrypty {
  static checkingPassword(password: string, passwordHash:string) {
    const isValid = bcrypt.compareSync(password, passwordHash);

    if (!isValid) {
      throw new Unauthorized('Incorrect email or password');
    }
  }
}
