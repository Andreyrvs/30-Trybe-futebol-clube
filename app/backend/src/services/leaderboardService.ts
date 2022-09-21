import ILeaderboards, { ILeaderboardValidation } from '../interfaces/ILeaderboardValidation';
import LeaderboadModel from '../database/models/leaderboardModel';

export default class LeaderboadService {
  private readonly leaderboardValidation: ILeaderboardValidation;
  constructor(private model: LeaderboadModel, leaderboardValidation: ILeaderboardValidation) {
    this.model = model;
    this.leaderboardValidation = leaderboardValidation;
  }

  async read():Promise<ILeaderboards[]> {
    const matches = await this.model.read();
    const result = this.leaderboardValidation.filteredMatches(matches);
    return result;
  }
}
