export type LoginData = {
  email: string;
  password: string;
};

export default interface ILogin {
  login(body: LoginData): Promise<object | void>;
}
