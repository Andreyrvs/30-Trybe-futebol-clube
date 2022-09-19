import IMatches from '../../interfaces/IMatches';
import Matches from './Matches';

export default class MatchesModel implements IMatches<Matches> {
  constructor(private model = Matches) {
    this.model = model;
  }

  async read():Promise<Matches[]> {
    const matches = await this.model.findAll();

    return matches;
  }
}
