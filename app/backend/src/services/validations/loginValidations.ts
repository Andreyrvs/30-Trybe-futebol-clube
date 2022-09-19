import { ILoginValidation } from '../../interfaces/ILoginValidation';
import InvalidFields from '../../errors/invalidFields';
import { LoginData } from '../../interfaces/ILogin';

export default class LoginValidation implements ILoginValidation {
  checkEmail = (email: string): void => {
    if (email.length === 0) {
      throw new InvalidFields('All fields must be filled');
    }
  };

  checkPassword = (password: string): void => {
    if (password.length === 0) {
      throw new InvalidFields('All fields must be filled');
    }
  };

  checkNewLogin = (body: LoginData):void => {
    this.checkEmail(body.email);
    this.checkPassword(body.password);
  };
}
