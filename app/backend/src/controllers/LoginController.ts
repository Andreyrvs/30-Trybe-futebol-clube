import { Request, Response, NextFunction } from 'express';
import generateToken from '../Auth/jwt';
import LoginService from '../services/loginService';
import { Ilogin } from '../database/models/entitites/ILogin';

export default class LoginController {
  constructor(private loginService = LoginService) { }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const newLogin = req.body as Ilogin;

      const result = await this.loginService.login(newLogin);
      const token = generateToken(newLogin);

      if (!result) throw new Error('Algo deu errado');

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
