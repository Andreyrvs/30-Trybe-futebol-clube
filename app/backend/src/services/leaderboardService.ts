import LeaderboadModel from '../database/models/leaderboardModel';
import { ILeaderboardValidation } from '../interfaces/ILeaderboardValidation';

export default class LeaderboadService {
  private readonly leaderboardValidation: ILeaderboardValidation;
  constructor(private model: LeaderboadModel, leaderboardValidation: ILeaderboardValidation) {
    this.model = model;
    this.leaderboardValidation = leaderboardValidation;
  }

  async leaderboards():Promise<number[]> {
    return this.leaderboardValidation.checkTotalGoals();
  }
}
