import { Request, Response, NextFunction } from 'express';
import LeaderboadService from '../services/leaderboardService';

export default class LeaderboadController {
  constructor(private leaderboardService: LeaderboadService) {
    this.leaderboardService = leaderboardService;
  }

  async read(
    req: Request,
    res:Response,
    next: NextFunction,
  ):Promise<void> {
    try {
      const result = await this.leaderboardService.read();

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
