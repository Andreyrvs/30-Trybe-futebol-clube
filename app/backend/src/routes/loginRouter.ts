import { Router } from 'express';
import LoginValidation from '../services/validations/loginValidations';
import LoginService from '../services/loginService';
import LoginController from '../controllers/LoginController';
import LoginModel from '../database/models/loginModel';

const loginValidations = new LoginValidation();
const loginModel = new LoginModel();
const loginService = new LoginService(loginModel, loginValidations);
const loginController = new LoginController(loginService);

const loginRouter = Router();

loginRouter.post('/', (req, res, next) => loginController.login(req, res, next));
loginRouter.get('/validate', (req, res, next) => loginController.validate(req, res, next));
export default loginRouter;
