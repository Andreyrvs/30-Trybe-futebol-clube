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

  async readAll():Promise<ILeaderboards[]> {
    const matches = await this.model.readHome();
    const teams = await this.teamModel.leaderboard();
    const matchesAway = this.leaderboardAwayValidation.filteredMatches(matches, teams);
    const matchesHome = this.leaderboardHomeValidation.filteredMatches(matches, teams);
    const result = this.validate(matchesHome, matchesAway).sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) { return b.totalPoints - a.totalPoints; }

      if (a.totalVictories !== b.totalVictories) { return b.totalVictories - a.totalVictories; }

      if (a.goalsBalance !== b.goalsBalance) { return b.goalsBalance - a.goalsBalance; }

      if (a.goalsFavor !== b.goalsFavor) { return b.goalsFavor - a.goalsFavor; }

      if (b.goalsOwn !== a.goalsOwn) { return b.goalsOwn - a.goalsOwn; }

      return 0;
    });

    return result;
  }

  validate = (
    matchesHome: ILeaderboards[],
    matchesAway:ILeaderboards[],
  ):ILeaderboards[] => matchesHome.map((home) => {
    const finded = matchesAway.find((away) => away.name === home.name);
    // if (!finded) throw new Error('FOi');
    const totalPoints = home.totalPoints + finded!.totalPoints;
    const totalGames = home.totalGames + finded!.totalGames;
    return {
      name: String(home.name),
      totalPoints: home.totalPoints + finded!.totalPoints,
      totalGames: home.totalGames + finded!.totalGames,
      totalVictories: home.totalVictories + finded!.totalVictories,
      totalDraws: home.totalDraws + finded!.totalDraws,
      totalLosses: home.totalLosses + finded!.totalLosses,
      goalsFavor: home.goalsFavor + finded!.goalsFavor,
      goalsOwn: home.goalsOwn + finded!.goalsOwn,
      goalsBalance: home.goalsBalance + finded!.goalsBalance,
      efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)),
    } as ILeaderboards;
  });
}
