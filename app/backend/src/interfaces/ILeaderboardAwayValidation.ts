import Teams from '../database/models/Teams';
// import { bodyMatches } from './IMatches';

export default interface ILeaderboardsAway {
  name: string
  totalPoints: number
  totalGames:number
  totalVictories: number
  totalDraws: number
  totalLosses:number
  goalsFavor:number
  goalsOwn:number
  goalsBalance: number
  efficiency:number
}

export interface IMachesAway {
  id?: number
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress?: boolean,
  teamHome?: {
    teamName: string
  }
  teamAway?: {
    teamName: string
  }
}

export interface IDataLeaderboardAway{
  team:{ id: number, teamName: string }
  matches: IMachesAway[]
}

export interface ILeaderboardAwayValidation {
  checkTotalGoals:(filtered: IDataLeaderboardAway) =>number[]
  checkTotalPoints:(filtered: IDataLeaderboardAway) => number[]
  checkLeaderboard:(filtered: IDataLeaderboardAway)=> ILeaderboardsAway
  tieBreakingOrder:(result: ILeaderboardsAway[])=>ILeaderboardsAway[]
  filteredMatches: (dataMatches: IMachesAway[], dataTeams: Teams[])=> ILeaderboardsAway[]
}
