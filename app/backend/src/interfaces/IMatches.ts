export default interface IMatches<T> {
  read(): Promise<T[]>
}
