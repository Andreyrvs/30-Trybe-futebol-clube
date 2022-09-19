import Matches from './Matches';
import Teams from './Teams';

export default class LeaderboadModel {
  constructor(private model = Matches) {
    this.model = model;
  }

  async homeTeam():Promise<Matches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }
}
