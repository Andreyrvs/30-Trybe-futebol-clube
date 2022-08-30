import { Ilogin } from '../database/models/entitites/ILogin';
import UsersModel from '../database/models/usersModel';

export default class LoginService {
  constructor(private model: Ilogin) {
    this.model = model;
  }

  static async login(login: Ilogin) {
    const { email } = login;
    const result = await UsersModel.findOne({ where: { email }, raw: true });
    return result;
  }
}
