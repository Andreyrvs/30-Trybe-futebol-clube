export default interface ILeaderBoardModel<T> {
  read():Promise<T[]>
}
