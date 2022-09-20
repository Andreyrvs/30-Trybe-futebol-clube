import { ILeaderboardValidation } from '../../interfaces/ILeaderboardValidation';

export default class LeaderboardValidation implements ILeaderboardValidation {
  checkTotalGoals:() =>number[];
}
