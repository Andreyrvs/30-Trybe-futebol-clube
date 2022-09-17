import Unauthorized from '../errors/Unauthorized';
import ILogin, { LoginData } from '../interfaces/ILogin';
import Users from '../database/models/User';
import JWT from '../Auth/jwt';
import Encrypty from '../Auth/bcrypt';
import { ILoginValidation } from './validations/loginValidations';

export default class LoginService implements ILogin {
  private readonly loginValidation: ILoginValidation;
  constructor(private model = Users, loginValidation: ILoginValidation) {
    this.model = model;
    this.loginValidation = loginValidation;
  }

  async login(body: LoginData):Promise<object> {
    const users = await this.model.findOne({ where: { email: body.email } });

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
