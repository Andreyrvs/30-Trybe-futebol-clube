export interface bodyMatches {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress?: boolean
}

export default interface IMatches<T> {
  read(): Promise<T[]>
  create(body: bodyMatches, authorization:string): Promise<T>
  updateOne(id: number):Promise<object>
}
