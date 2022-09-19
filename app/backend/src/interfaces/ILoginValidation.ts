import { LoginData } from './ILogin';

export interface ILoginValidation {
  checkEmail:(email:string)=>void,
  checkPassword:(password: string)=>void,
  checkNewLogin:(body: LoginData)=> void
}
