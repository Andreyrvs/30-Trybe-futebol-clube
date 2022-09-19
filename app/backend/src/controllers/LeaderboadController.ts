import { Request, Response, NextFunction } from 'express';
import LeaderboadService from '../services/leaderboardService';

export default class LeaderboadController {
  constructor(private leaderboardService: LeaderboadService) {
    this.leaderboardService = leaderboardService;
  }

  async homeTeam(
    req: Request,
    res:Response,
    next: NextFunction,
  ):Promise<void> {
    try {
      const result = await this.leaderboardService.homeTeam();

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
