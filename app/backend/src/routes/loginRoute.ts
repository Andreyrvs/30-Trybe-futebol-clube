import { Router } from 'express';
import LoginController from '../controllers/LoginController';

const LoginRoute = Router();
const loginControllers = new LoginController();

LoginRoute.post('/', loginControllers.login);

export default LoginRoute;
