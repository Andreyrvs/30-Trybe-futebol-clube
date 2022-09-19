import ILeaderboards from '../interfaces/ILeaderboard';
// import Matches from '../database/models/Matches';
import LeaderboadModel from '../database/models/leaderboardModel';

export default class LeaderboadService {
  constructor(private model: LeaderboadModel) {
    this.model = model;
  }

  async homeTeam():Promise<ILeaderboards> {
    const matches = await this.model.homeTeam();

    return {
      name: '',
      totalPoints: Number(matches),
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
  }
}
