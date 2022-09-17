import Unauthorized from '../errors/Unauthorized';
import ILogin, { LoginData } from '../interfaces/ILogin';
import Users from '../database/models/User';
import JWT from '../Auth/jwt';
import Encrypty from '../Auth/bcrypt';
import InvalidFields from '../errors/invalidFields';

export default class LoginService implements ILogin {
  constructor(private model = Users) {
    this.model = model;
  }

  async login(body: LoginData):Promise<object> {
    if (body.email.length === 0) {
      throw new InvalidFields('All fields must be filled');
    }

    if (body.password.length === 0) {
      throw new InvalidFields('All fields must be filled');
    }

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
