export interface IModel<T> {
  list(): Promise<T[]>
}
