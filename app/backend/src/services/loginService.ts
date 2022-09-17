import passwordService from './passwordService';
import { IService } from '../interfaces/IService';
// import { IModel } from '../interfaces/IModel';
import User from '../database/models/User';

export default class LoginService implements IService<User> {
  // constructor(private userModel: IModel<User>) { }

  async list():Promise<User[]> {
    const users: User[] = await User.findAll();
    return users;
  }

  async create({ email, password }): Promise<User> {
    const passwordHash = passwordService.encryptPassword(password);

    const user: User = await User.create({ email, passwordHash });
    return user;
  }
}
