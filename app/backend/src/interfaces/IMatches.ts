export default interface IMatches<T> {
  read(): Promise<T[]>
  // readParams(params: boolean): Promise<T[]>
}
