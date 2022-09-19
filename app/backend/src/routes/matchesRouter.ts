import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/matchesService';
import MatchesModel from '../database/models/matchesModel';

const matchesModel = new MatchesModel();
const matchesService = new MatchesService(matchesModel);
const matchesController = new MatchesController(matchesService);

const matchesRouter = Router();

matchesRouter.get('/', (req, res, next) => matchesController.read(req, res, next));
matchesRouter.get(
  '/?inProgress',
  (req, res, next) => matchesController.readParams(req, res, next),
);

export default matchesRouter;
