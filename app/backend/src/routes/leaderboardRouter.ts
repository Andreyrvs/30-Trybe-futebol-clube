import { Router } from 'express';

import LeaderboardAwayValidation from '../services/validations/leaderboardAwayValidation';
import LeaderboadModel from '../database/models/leaderboardModel';
import LeaderboardController from '../controllers/LeaderboadController';
import LeaderboardService from '../services/leaderboardService';
import TeamsModel from '../database/models/teamsModel';
import LeaderboardHomeValidation from '../services/validations/leaderboardHomeValidation';

const teamsModel = new TeamsModel();
const leaderboardAwayValidation = new LeaderboardAwayValidation();
const leaderboardHomeValidation = new LeaderboardHomeValidation();
const leaderboardModel = new LeaderboadModel();
const leaderboardService = new LeaderboardService(
  leaderboardModel,
  leaderboardHomeValidation,
  leaderboardAwayValidation,
  teamsModel,
);

const leaderboardController = new LeaderboardController(leaderboardService);

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/home',
  (req, res, next) => leaderboardController.readHome(req, res, next),
);

leaderboardRouter.get(
  '/away',
  (req, res, next) => leaderboardController.readAway(req, res, next),
);
leaderboardRouter.get(
  '/',
  (req, res, next) => leaderboardController.readAll(req, res, next),
);

export default leaderboardRouter;
