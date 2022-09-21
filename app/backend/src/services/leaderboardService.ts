import { ILeaderboardAwayValidation } from '../interfaces/ILeaderboardAwayValidation';
import TeamsModel from '../database/models/teamsModel';
import ILeaderboards, { ILeaderboardValidation } from '../interfaces/ILeaderboardValidation';
import LeaderboadModel from '../database/models/leaderboardModel';

export default class LeaderboadService {
  private readonly leaderboardValidation: ILeaderboardValidation;
  private readonly leaderboardAwayValidation: ILeaderboardAwayValidation;
  private readonly teamModel: TeamsModel;
  constructor(
    private model: LeaderboadModel,
    leaderboardValidation: ILeaderboardValidation,
    leaderboardAwayValidation: ILeaderboardAwayValidation,
    teamModel: TeamsModel,
  ) {
    this.model = model;
    this.leaderboardValidation = leaderboardValidation;
    this.leaderboardAwayValidation = leaderboardAwayValidation;
    this.teamModel = teamModel;
  }

  async readHome():Promise<ILeaderboards[]> {
    const matches = await this.model.readHome();
    const teams = await this.teamModel.leaderboard();

    const result = this.leaderboardValidation.filteredMatches(matches, teams);
    return result;
  }

  async readAway():Promise<ILeaderboards[]> {
    const matches = await this.model.readHome();
    const teams = await this.teamModel.leaderboard();
    const result = this.leaderboardAwayValidation.filteredMatches(matches, teams);
    return result;
  }
}
