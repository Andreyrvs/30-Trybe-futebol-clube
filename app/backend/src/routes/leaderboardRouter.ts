import { Router } from 'express';

import LeaderboardAwayValidation from '../services/validations/leaderboardAwayValidation';
import LeaderboadModel from '../database/models/leaderboardModel';
import LeaderboardController from '../controllers/LeaderboadController';
import LeaderboardService from '../services/leaderboardService';
import LeaderboardValidation from '../services/validations/leaderboardValidation';
import TeamsModel from '../database/models/teamsModel';

const teamsModel = new TeamsModel();
const leaderboardAwayValidation = new LeaderboardAwayValidation();
const leaderboardValidation = new LeaderboardValidation();
const leaderboardModel = new LeaderboadModel();
const leaderboardService = new LeaderboardService(
  leaderboardModel,
  leaderboardValidation,
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

export default leaderboardRouter;
