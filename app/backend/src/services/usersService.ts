import Users from '../database/models/usersModel';

export default class userService {
  async create() {
    const users = await Users.create();
    return users;
  }
}
