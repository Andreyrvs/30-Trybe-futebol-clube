import Unauthorized from '../errors/Unauthorized';
import ILogin, { LoginData } from '../interfaces/ILogin';
import JWT from '../Auth/jwt';
import Encrypty from '../Auth/bcrypt';
import { ILoginValidation } from './validations/loginValidations';
import LoginModel from '../database/models/loginModel';

export default class LoginService implements ILogin {
  private readonly loginValidation: ILoginValidation;
  constructor(private model: LoginModel, loginValidation: ILoginValidation) {
    this.model = model;
    this.loginValidation = loginValidation;
  }

  async login(body: LoginData):Promise<object> {
    this.loginValidation.checkNewLogin(body);

    const users = await this.model.login(body);

    if (!users) {
      throw new Unauthorized('Incorrect email or password');
    }

    Encrypty.checkingPassword(body.password, users.password);

    const token = JWT.generateToken(body);
    return {
      token,
    };
  }
}
