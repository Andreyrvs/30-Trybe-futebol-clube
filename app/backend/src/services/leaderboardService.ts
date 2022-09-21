import TeamsModel from '../database/models/teamsModel';
import ILeaderboards, { ILeaderboardValidation } from '../interfaces/ILeaderboardValidation';
import LeaderboadModel from '../database/models/leaderboardModel';

export default class LeaderboadService {
  private readonly leaderboardValidation: ILeaderboardValidation;
  private readonly teamModel: TeamsModel;
  constructor(
    private model: LeaderboadModel,
    leaderboardValidation: ILeaderboardValidation,
    teamModel: TeamsModel,
  ) {
    this.model = model;
    this.leaderboardValidation = leaderboardValidation;
    this.teamModel = teamModel;
  }

  async read():Promise<ILeaderboards[]> {
    const matches = await this.model.read();
    const teams = await this.teamModel.leaderboard();

    const result = this.leaderboardValidation.filteredMatches(matches, teams);
    return result;
  }
}
