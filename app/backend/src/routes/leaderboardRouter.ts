import { Router } from 'express';

import LeaderboadModel from '../database/models/leaderboardModel';
import LeaderboardController from '../controllers/LeaderboadController';
import LeaderboardService from '../services/leaderboardService';
import LeaderboardValidation from '../services/validations/leaderboardValidation';
import TeamsModel from '../database/models/teamsModel';

const teamsModel = new TeamsModel();
const leaderboardValidation = new LeaderboardValidation();
const leaderboardModel = new LeaderboadModel();
const leaderboardService = new LeaderboardService(
  leaderboardModel,
  leaderboardValidation,
  teamsModel,
);
const leaderboardController = new LeaderboardController(leaderboardService);

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/home',
  (req, res, next) => leaderboardController.read(req, res, next),
);

export default leaderboardRouter;
