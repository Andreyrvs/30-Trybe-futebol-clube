import { Router } from 'express';

import LeaderboadModel from '../database/models/leaderboardModel';
import LeaderboardController from '../controllers/LeaderboadController';
import LeaderboardService from '../services/leaderboardService';

const leaderboardModel = new LeaderboadModel();
const leaderboardService = new LeaderboardService(leaderboardModel);
const leaderboardController = new LeaderboardController(leaderboardService);

const leaderboardRouter = Router();

leaderboardRouter.get('/home', (req, res, next) => leaderboardController.homeTeam(req, res, next));

export default leaderboardRouter;
