import * as bcrypt from 'bcryptjs';

export default class Encrypty {
  static encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync(5);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    return encryptedPassword;
  }

  static checkingPassword(password: string, passwordHash:string) {
    const isValid = bcrypt.compareSync(password, passwordHash);

    if (!isValid) {
      throw new Error('Invalid email or password');
    }
  }
}
