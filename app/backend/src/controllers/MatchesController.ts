import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  constructor(private matchesService: MatchesService) {
    this.matchesService = matchesService;
  }

  async create(
    req: Request,
    res:Response,
    next: NextFunction,
  ):Promise<void> {
    try {
      const { authorization } = req.headers;
      const result = await this.matchesService.create(req.body, String(authorization));

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async read(
    req: Request,
    res:Response,
    next: NextFunction,
  ):Promise<void> {
    try {
      const result = await this.matchesService.read();

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async readParams(
    req: Request,
    res:Response,
    next: NextFunction,
  ):Promise<void> {
    try {
      const { inProgress } = req.query;

      const result = await this.matchesService.readParams(Boolean(inProgress));

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateOne(
    req: Request,
    res:Response,
    next: NextFunction,
  ):Promise<void> {
    try {
      const { id } = req.params;
      const updatedMatches = await this.matchesService.updateOne(Number(id));

      res.status(200).json(updatedMatches);
    } catch (error) {
      next(error);
    }
  }

  async updateGoals(
    req: Request,
    res:Response,
    next: NextFunction,
  ):Promise<void> {
    try {
      const { id } = req.params;
      const updatedMatches = await this.matchesService.updateGoals(Number(id), req.body);

      res.status(200).json(updatedMatches);
    } catch (error) {
      next(error);
    }
  }
}
