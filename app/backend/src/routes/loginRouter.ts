import { Router } from 'express';
import LoginService from '../services/loginService';
import LoginController from '../controllers/LoginController';

const loginService = new LoginService();
const loginController = new LoginController(loginService);

const loginRouter = Router();

loginRouter.post('/', (req, res, next) => loginController.login(req, res, next));

export default loginRouter;
