export default interface ITeams<T> {
  read(): Promise<T[]>
}
