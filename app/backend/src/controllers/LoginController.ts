import { Request, Response, NextFunction } from 'express';
import ILogin from '../interfaces/ILogin';

export default class LoginController {
  constructor(private userService: ILogin) {
    this.userService = userService;
  }

  async login(req: Request, res: Response, next: NextFunction):Promise<void> {
    try {
      const result = await this.userService.login(req.body);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
