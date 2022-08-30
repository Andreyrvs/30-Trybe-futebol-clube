import { Ilogin } from './ILogin';

export default class Login implements Ilogin {
  public email: string;
  public password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}
