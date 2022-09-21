import Teams from '../../database/models/Teams';
import ILeaderboards, {
  IDataLeaderboar,
  ILeaderboardValidation, IMaches }
  from '../../interfaces/ILeaderboardValidation';

export default class LeaderboardValidation implements ILeaderboardValidation {
  checkGoalsFavor = (filtered: IDataLeaderboar): number[] => {
    // const goalsFavor = filtered
    //   .map(({ matches }) =>
    //     matches
    //       .map(({ homeTeamGoals }) => homeTeamGoals)
    //       .reduce((acc, curr) => acc + curr));
    const goalFavor = filtered.matches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    return [goalFavor];
  };

  checkGoalsOwn = (filtered: IDataLeaderboar): number[] => {
    // const goalsOwn = filtered
    //   .map(({ matches }) =>
    //     matches
    //       .map(({ awayTeamGoals }) => awayTeamGoals)
    //       .reduce((acc, curr) => acc + curr));

    // return goalsOwn;

    const goalsOwn = filtered.matches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    return [goalsOwn];
  };

  checkTotalPoints = (filtered: IDataLeaderboar):number[] => {
    let winner = 0;
    let loser = 0;
    let draw = 0;

    // filtered
    //   .forEach(({ matches }) => matches
    //     .forEach(({ homeTeamGoals, awayTeamGoals }) => {
    //       if (homeTeamGoals > awayTeamGoals) winner += 1;
    //       if (homeTeamGoals < awayTeamGoals) loser += 1;
    //       if (homeTeamGoals === awayTeamGoals) draw += 1;
    //     }));
    filtered.matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) winner += 1;
      if (homeTeamGoals < awayTeamGoals) loser += 1;
      if (homeTeamGoals === awayTeamGoals) draw += 1;
    });

    const totalPoints = 3 * winner + draw;
    const totalGames = winner + loser + draw;
    return [winner, loser, draw, totalPoints, totalGames];
  };

  checkLeaderboard = (filtered: IDataLeaderboar): ILeaderboards => {
    const [winner, loser, draw, totalPoints, totalGames] = this.checkTotalPoints(filtered);
    const [goalsFavor] = this.checkGoalsFavor(filtered);
    const [goalsOwn] = this.checkGoalsOwn(filtered);
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));

    const leader = {
      name: String(filtered.team.teamName),
      totalPoints,
      totalGames,
      totalVictories: winner,
      totalDraws: draw,
      totalLosses: loser,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    };

    return leader;
  };

  filteredMatches = (dataMatches: IMaches[], dataTeams: Teams[]): ILeaderboards[] => {
    const filtered = dataTeams.map((team) => {
      const finded = dataMatches.filter((match) => match.homeTeam === team.id);
      // console.log('✏ ✏ ✏', finded);
      return {
        team,
        matches: finded,
      };
    });

    // console.log('🚩 🚩 🚩', filtered);
    filtered.map((item) => console.log('⚽ ⚽ ⚽', item));
    const result = filtered
      .map((item: IDataLeaderboar) => this.checkLeaderboard(item))
      .sort((a, b) => b.totalPoints - a.totalPoints);

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
