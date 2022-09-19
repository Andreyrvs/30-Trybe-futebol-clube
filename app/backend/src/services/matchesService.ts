import Teams from '../database/models/Teams';
import NotFound from '../errors/NotFound';
import IMatchesValidation from '../interfaces/IMatchesValidation';
import IMatches, { bodyMatches } from '../interfaces/IMatches';
import MatchesModel from '../database/models/matchesModel';
import Matches from '../database/models/Matches';

export default class MatchesService implements IMatches<Matches> {
  private readonly matchesValidation: IMatchesValidation;
  constructor(private model: MatchesModel, matchesValidation: IMatchesValidation) {
    this.model = model;
    this.matchesValidation = matchesValidation;
  }

  async create(body: bodyMatches, authorization:string): Promise<Matches> {
    this.matchesValidation.validate(authorization);
    this.matchesValidation.checkMatches(body);

    const hteam = await Teams.findOne({ where: { id: body.homeTeam } });
    const ateam = await Teams.findOne({ where: { id: body.awayTeam } });

    if (!hteam || !ateam) {
      throw new NotFound('There is no team with such id!');
    }

    const newMatches = await this.model.create(body);
    return newMatches;
  }

  async read(): Promise<Matches[]> {
    const matches = await this.model.read();

    return matches;
  }

  async readParams(params:boolean): Promise<Matches[]> {
    if (params === true) {
      const match = await this.model.readParams(1);
      return match;
    }
    const match = await this.model.readParams(0);
    return match;
  }

  async updateOne(id:number): Promise<object> {
    const updatedMatch = await this.model.updateOne(id);

    return updatedMatch;
  }

  async updateGoals(id:number, body: bodyMatches): Promise<object> {
    const updatedMatch = await this.model.updateGoals(id, body);

    return updatedMatch;
  }
}
