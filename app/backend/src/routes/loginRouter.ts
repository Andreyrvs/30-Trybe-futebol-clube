import { Router } from 'express';
// import mwError from '../middleware/error';
import LoginService from '../services/loginService';
import LoginController from '../controllers/LoginController';

const loginService = new LoginService();
const loginController = new LoginController(loginService);

const loginRouter = Router();
// loginRouter.use(mwError);
loginRouter.post('/', (req, res, next) => loginController.login(req, res, next));

export default loginRouter;
