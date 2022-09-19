export type bodyMatches = {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean
};

export default interface IMatches<T> {
  read(): Promise<T[]>
  // readParams(params: boolean): Promise<T[]>
}
