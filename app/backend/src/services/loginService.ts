// import passwordService from './passwordService';
import { IService } from '../interfaces/IService';
// import { IModel } from '../interfaces/IModel';
import User from '../database/models/User';

export default class LoginService implements IService<User> {
  constructor(private loginModel = User) {
    this.loginModel = loginModel;
  }

  async list():Promise<User[]> {
    const users: User[] = await this.loginModel.findAll();
    return users;
  }

  // async create({ email, password }): Promise<User> {
  //   const passwordHash = passwordService.encryptPassword(password);

  //   const user: User = await this.userService.create({ email, passwordHash });
  //   return user;
  // }
}
