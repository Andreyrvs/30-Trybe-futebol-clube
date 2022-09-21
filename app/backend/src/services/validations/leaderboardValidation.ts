import Teams from '../../database/models/Teams';
import { bodyMatches } from '../../interfaces/IMatches';
import ILeaderboards, { ILeaderboardValidation, IMaches }
  from '../../interfaces/ILeaderboardValidation';

export default class LeaderboardValidation implements ILeaderboardValidation {
  checkTotalGoals = (matches: IMaches[]): number[] => {
    const golsAFavor = matches.reduce((acc, curr:bodyMatches) => acc + curr.homeTeamGoals, 0);

    const golsContra = matches.reduce((acc, curr: bodyMatches) => acc + curr.awayTeamGoals, 0);

    return [golsAFavor, golsContra];
  };

  checkTotalPoints = (matches:IMaches[]):number[] => {
    let winner = 0;
    let loser = 0;
    let draw = 0;

    matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) winner += 1;
      if (match.homeTeamGoals < match.awayTeamGoals) loser += 1;
      if (match.homeTeamGoals === match.awayTeamGoals) draw += 1;
    });

    const totalPoints = 3 * winner + draw;
    const totalGames = winner + loser + draw;
    return [winner, loser, draw, totalPoints, totalGames];
  };

  checkLeaderboard = (matches: IMaches[]): ILeaderboards => {
    const [winner, loser, draw, totalPoints, totalGames] = this.checkTotalPoints(matches);
    const [golsAFavor, golsContra] = this.checkTotalGoals(matches);
    const goalsBalance = golsAFavor - golsContra;
    const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));

    const leader = {
      name: '',
      totalPoints,
      totalGames,
      totalVictories: winner,
      totalDraws: draw,
      totalLosses: loser,
      goalsFavor: golsAFavor,
      goalsOwn: golsContra,
      goalsBalance,
      efficiency,
    };

    return leader;
  };

  filteredMatches = (matches: IMaches[], teams: Teams[]): ILeaderboards[] => {
    const filtered = teams.map((team) => {
      const finded = matches.filter((match) => match.homeTeam === team.id);

      return {
        team,
        matches: finded,
      };
    });
    // console.log('Test', filtered);
    filtered.map((el) => console.log('============>', el));
    // console.log(">>>>>>>>", filtered.map((el)=> el.));

    const result = this.checkLeaderboard(matches);

    return [result];
  };
}
