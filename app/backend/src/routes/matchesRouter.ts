import { Router } from 'express';
import MatchesValidation from '../services/validations/matchesValidatons';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/matchesService';
import MatchesModel from '../database/models/matchesModel';

const matchesValidation = new MatchesValidation();
const matchesModel = new MatchesModel();
const matchesService = new MatchesService(matchesModel, matchesValidation);
const matchesController = new MatchesController(matchesService);

const matchesRouter = Router();

matchesRouter.patch('/:id/finish', (req, res, next) => matchesController.updateOne(req, res, next));
matchesRouter.patch('/:id', (req, res, next) => matchesController.updateGoals(req, res, next));

matchesRouter.get('/', (req, res, next) => matchesController.read(req, res, next));
matchesRouter.post('/', (req, res, next) => matchesController.create(req, res, next));
matchesRouter.get(
  '/?inProgress',
  (req, res, next) => matchesController.readParams(req, res, next),
);

export default matchesRouter;
