import { bodyMatches } from './IMatches';

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

export interface ILeaderboardValidation {
  checkTotalGoals:(matches: bodyMatches[]) =>number[]
  checkTotalPoints:(matches: bodyMatches[]) => number[]
  checkLeaderboard:(el: IMaches, matches: IMaches[])=> ILeaderboards
  filteredMatches: (matches: IMaches[])=> ILeaderboards[]
}
