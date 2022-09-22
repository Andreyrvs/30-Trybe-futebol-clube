import { Request, Response, NextFunction } from 'express';
import LeaderboadService from '../services/leaderboardService';

export default class LeaderboadController {
  constructor(private leaderboardService: LeaderboadService) {
    this.leaderboardService = leaderboardService;
  }

  async readHome(
    req: Request,
    res:Response,
    next: NextFunction,
  ):Promise<void> {
    try {
      const result = await this.leaderboardService.readHome();

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async readAway(
    req: Request,
    res:Response,
    next: NextFunction,
  ):Promise<void> {
    try {
      const result = await this.leaderboardService.readAway();

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async readAll(
    req: Request,
    res:Response,
    next: NextFunction,
  ):Promise<void> {
    try {
      const result = await this.leaderboardService.readAll();

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
