import InvalidFields from '../../errors/invalidFields';
import { LoginData } from '../../interfaces/ILogin';

export interface ILoginValidation {
  checkEmail:(email:string)=>void,
  checkPassword:(password: string)=>void,
  checkNewLogin:(body: LoginData)=> void
}

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
