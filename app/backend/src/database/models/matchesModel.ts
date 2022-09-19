import IMatches from '../../interfaces/IMatches';
import Matches from './Matches';
import Teams from './Teams';

export default class MatchesModel implements IMatches<Matches> {
  constructor(private model = Matches) {
    this.model = model;
  }

  async read():Promise<Matches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  async readParams(params: number): Promise<Matches[]> {
    const match = await this.model.findAll({
      where: { inProgress: params },
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });

    return match;
  }
}
