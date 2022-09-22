import Teams from '../../database/models/Teams';
import ILeaderboards, {
  IDataLeaderboar,
  ILeaderboardHomeValidation,
  IMaches }
  from '../../interfaces/ILeaderboardHomeValidation';

export default class LeaderboardHomeValidation implements ILeaderboardHomeValidation {
  checkTotalGoals = (filtered: IDataLeaderboar): number[] => {
    const goalsFavor = filtered.matches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    const goalsOwn = filtered.matches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    return [goalsFavor, goalsOwn];
  };

  checkTotalPoints = (filtered: IDataLeaderboar):number[] => {
    let totalVictories = 0;
    let loser = 0;
    let totalDraws = 0;

    filtered.matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamGoals > awayTeamGoals) totalVictories += 1;
      if (homeTeamGoals < awayTeamGoals) loser += 1;
      if (homeTeamGoals === awayTeamGoals) totalDraws += 1;
    });

    const totalPoints = 3 * totalVictories + totalDraws;
    const totalGames = totalVictories + loser + totalDraws;
    return [totalVictories, loser, totalDraws, totalPoints, totalGames];
  };

  checkLeaderboard = (filtered: IDataLeaderboar): ILeaderboards => {
    const [totalVictories, loser,
      totalDraws, totalPoints, totalGames] = this.checkTotalPoints(filtered);
    const [goalsFavor, goalsOwn] = this.checkTotalGoals(filtered);
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));

    const leader = {
      name: String(filtered.team.teamName),
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses: loser,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    };

    return leader;
  };

  tieBreakingOrder = (result:ILeaderboards[]):ILeaderboards[] => {
    const test = result.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) { return b.totalPoints - a.totalPoints; }

      if (a.totalVictories !== b.totalVictories) { return b.totalVictories - a.totalVictories; }

      if (a.goalsBalance !== b.goalsBalance) { return b.goalsBalance - a.goalsBalance; }

      if (a.goalsFavor !== b.goalsFavor) { return b.goalsFavor - a.goalsFavor; }

      if (b.goalsOwn !== a.goalsOwn) { return b.goalsOwn - a.goalsOwn; }

      return 0;
    });
    return test;
  };

  filteredMatches = (dataMatches: IMaches[], dataTeams: Teams[]): ILeaderboards[] => {
    const filtered = dataTeams.map((team) => {
      const finded = dataMatches.filter((match) => match.homeTeam === team.id);
      return {
        team,
        matches: finded,
      };
    });

    // console.log('🚩 🚩 🚩', filtered);
    // filtered.map((item) => console.log('⚽ ⚽ ⚽', item));
    const result = filtered
      .map((item: IDataLeaderboar) => this.checkLeaderboard(item));

    const ordered = this.tieBreakingOrder(result);

    return ordered;
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
