import { LoginData } from '../../interfaces/ILogin';
import Users from './User';

export default class LoginModel {
  constructor(private model = Users) {
    this.model = model;
  }

  async login(body: LoginData):Promise<Users | null> {
    const users = await this.model.findOne({ where: { email: body.email } });
    return users;
  }
}
