import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import Users from '../database/models/User';

export default class LoginController {
  constructor(private userService: IService<Users>) { }

  async list(req: Request, res: Response):Promise<void> {
    const result = await this.userService.list();
    res.status(200).json(result);
  }
}
