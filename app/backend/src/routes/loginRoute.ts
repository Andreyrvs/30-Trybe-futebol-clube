import { Router } from 'express';
import LoginService from '../services/loginService';
import LoginController from '../controllers/LoginController';

const router = Router();
const loginService = new LoginService();
const loginControllers = new LoginController(loginService);

router.get('/', loginControllers.list);

export default router;
