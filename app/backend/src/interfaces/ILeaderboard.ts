export default interface ILeaderBoardModel<T> {
  readHome():Promise<T[]>
}
