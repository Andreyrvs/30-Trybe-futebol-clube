export type LoginData = {
  email: string;
  password: string;
};

export default interface ILogin {
  validate(authorization: string | undefined): unknown;
  login(body: LoginData): Promise<object | void>;
}
