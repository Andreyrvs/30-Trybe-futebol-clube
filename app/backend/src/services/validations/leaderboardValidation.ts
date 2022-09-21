import Teams from '../../database/models/Teams';
import ILeaderboards, {
  IDataLeaderboar,
  ILeaderboardValidation, IMaches }
  from '../../interfaces/ILeaderboardValidation';

export default class LeaderboardValidation implements ILeaderboardValidation {
  checkGoalsFavor = (filtered: IDataLeaderboar[]): number[] => {
    const goalsFavor = filtered
      .map(({ matches }) =>
        matches
          .map(({ homeTeamGoals }) => homeTeamGoals)
          .reduce((acc, curr) => acc + curr));

    return goalsFavor;
  };

  checkGoalsOwn = (filtered: IDataLeaderboar[]): number[] => {
    const goalsOwn = filtered
      .map(({ matches }) =>
        matches
          .map(({ awayTeamGoals }) => awayTeamGoals)
          .reduce((acc, curr) => acc + curr));

    return goalsOwn;
  };

  checkTotalPoints = (filtered: IDataLeaderboar[]):number[] => {
    let winner = 0;
    let loser = 0;
    let draw = 0;

    filtered
      .forEach(({ matches }) => matches
        .forEach(({ homeTeamGoals, awayTeamGoals }) => {
          if (homeTeamGoals > awayTeamGoals) winner += 1;
          if (homeTeamGoals < awayTeamGoals) loser += 1;
          if (homeTeamGoals === awayTeamGoals) draw += 1;
        }));

    const totalPoints = 3 * winner + draw;
    const totalGames = winner + loser + draw;
    return [winner, loser, draw, totalPoints, totalGames];
  };

  checkLeaderboard = (filtered: IDataLeaderboar[]): ILeaderboards[] => {
    const [winner, loser, draw, totalPoints, totalGames] = this.checkTotalPoints(filtered);
    this.checkGoalsFavor(filtered);
    this.checkGoalsOwn(filtered);
    // const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));

    const leader = filtered.map((items) => ({
      name: String(items.team.teamName),
      totalPoints,
      totalGames,
      totalVictories: winner,
      totalDraws: draw,
      totalLosses: loser,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency,
    }));

    return leader;
  };

  filteredMatches = (dataMatches: IMaches[], dataTeams: Teams[]): ILeaderboards[] => {
    const filtered = dataTeams.map((team) => {
      const finded = dataMatches.filter((match) => match.homeTeam === team.id);

      return {
        team,
        matches: finded,
      };
    });

    const result = this.checkLeaderboard(filtered);

    return result;
  };
}

// const leader = {
//   name: '',
//   totalPoints,
//   totalGames,
//   totalVictories: winner,
//   totalDraws: draw,
//   totalLosses: loser,
//   goalsFavor: golsAFavor,
//   goalsOwn: golsContra,
//   goalsBalance,
//   efficiency,
// };
