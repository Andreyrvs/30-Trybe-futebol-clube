import { ILeaderboardHomeValidation } from '../interfaces/ILeaderboardHomeValidation';
import TeamsModel from '../database/models/teamsModel';
import LeaderboadModel from '../database/models/leaderboardModel';
import ILeaderboards,
{
  ILeaderboardAwayValidation,
} from '../interfaces/ILeaderboardAwayValidation';
import LeaderboardHomeValidation from './validations/leaderboardHomeValidation';

export default class LeaderboadService {
  private readonly leaderboardHomeValidation: ILeaderboardHomeValidation;
  private readonly leaderboardAwayValidation: ILeaderboardAwayValidation;
  private readonly teamModel: TeamsModel;
  constructor(
    private model: LeaderboadModel,
    leaderboardHomeValidation: LeaderboardHomeValidation,
    leaderboardAwayValidation: ILeaderboardAwayValidation,
    teamModel: TeamsModel,
  ) {
    this.model = model;
    this.leaderboardHomeValidation = leaderboardHomeValidation;
    this.leaderboardAwayValidation = leaderboardAwayValidation;
    this.teamModel = teamModel;
  }

  async readHome():Promise<ILeaderboards[]> {
    const matches = await this.model.readHome();
    const teams = await this.teamModel.leaderboard();

    const result = this.leaderboardHomeValidation.filteredMatches(matches, teams);
    return result;
  }

  async readAway():Promise<ILeaderboards[]> {
    const matches = await this.model.readHome();
    const teams = await this.teamModel.leaderboard();
    const result = this.leaderboardAwayValidation.filteredMatches(matches, teams);
    return result;
  }

  async readAll():Promise<ILeaderboards[][]> {
    const matches = await this.model.readHome();
    const teams = await this.teamModel.leaderboard();
    const matchesAway = this.leaderboardAwayValidation.filteredMatches(matches, teams);
    const matchesHome = this.leaderboardHomeValidation.filteredMatches(matches, teams);

    // this.validate(matchesHome, matchesAway);
    return [matchesAway, matchesHome];
  }
}
