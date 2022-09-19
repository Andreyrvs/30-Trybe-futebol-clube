import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  constructor(private teamService: TeamsService) {
    this.teamService = teamService;
  }

  async read(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this.teamService.read();

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async readOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.teamService.readOne(Number(id));
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
