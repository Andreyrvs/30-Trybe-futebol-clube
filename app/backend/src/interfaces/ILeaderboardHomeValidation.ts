import Teams from '../database/models/Teams';
// import { bodyMatches } from './IMatches';

export default interface ILeaderboards {
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

export interface IMaches {
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

export interface IDataLeaderboar {
  team:{ id: number, teamName: string }
  matches: IMaches[]
}

export interface ILeaderboardHomeValidation {
  checkTotalGoals:(filtered: IDataLeaderboar) =>number[]
  checkTotalPoints:(filtered: IDataLeaderboar) => number[]
  checkLeaderboard:(filtered: IDataLeaderboar)=> ILeaderboards
  tieBreakingOrder:(result: ILeaderboards[])=>ILeaderboards[]
  filteredMatches: (dataMatches: IMaches[], dataTeams: Teams[])=> ILeaderboards[]
}
