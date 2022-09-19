import IMatches from '../interfaces/IMatches';
import MatchesModel from '../database/models/matchesModel';
import Matches from '../database/models/Matches';

export default class MatchesService implements IMatches<Matches> {
  constructor(private model: MatchesModel) {
    this.model = model;
  }

  async read(): Promise<Matches[]> {
    const matches = await this.model.read();

    return matches;
  }
}
