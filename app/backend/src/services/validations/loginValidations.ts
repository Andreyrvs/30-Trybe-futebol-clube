// import InvalidFields from '../../errors/invalidFields';
import ILogin from '../../interfaces/ILogin';

export interface ILoginValidation {
  // checkEmail:(email:string)=>void,
  // checkPassword:(password: string)=>void,
  checkNewLoginBody:(body: ILogin)=> void
}

export default class LoginValidation implements ILoginValidation {
  // public checkEmail(email: string): void {
  //   if (email.length === 0) {
  //     throw new InvalidFields('All fields must be filled');
  //   }
  // }

  // public checkPassword(password: string): void {
  //   if (password.length === 0) {
  //     throw new InvalidFields('All fields must be filled');
  //   }
  // }

  checkNewLoginBody: (body: ILogin) => void;
}
