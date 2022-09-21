import ILeaderBoardModel from '../../interfaces/ILeaderboard';
import Matches from './Matches';
import Teams from './Teams';

export default class LeaderboadModel implements ILeaderBoardModel<Matches> {
  constructor(private model = Matches) {
    this.model = model;
  }

  async readHome():Promise<Matches[]> {
    const matches = await this.model.findAll({
      where: { inProgress: 0 },
      raw: true,
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
      ],
    });

    return matches;
  }
}
