import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';
import TeamsService from '../services/teamsService';
import TeamsModel from '../database/models/teamsModel';

const teamsModel = new TeamsModel();
const teamsService = new TeamsService(teamsModel);
const teamsController = new TeamsController(teamsService);

const teamsRouter = Router();

teamsRouter.get('/', (req, res, next) => teamsController.read(req, res, next));
teamsRouter.get('/:id', (req, res, next) => teamsController.readOne(req, res, next));

export default teamsRouter;
