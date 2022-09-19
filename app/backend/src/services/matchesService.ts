import Unauthorized from '../errors/Unauthorized';
import JWT from '../Auth/jwt';
import IMatches, { bodyMatches } from '../interfaces/IMatches';
import MatchesModel from '../database/models/matchesModel';
import Matches from '../database/models/Matches';

export default class MatchesService implements IMatches<Matches> {
  constructor(private model: MatchesModel) {
    this.model = model;
  }

  async create(body: bodyMatches, authorization:string): Promise<Matches> {
    const newMatches = await this.model.create(body);
    this.validate(authorization);
    return newMatches;
  }

  validate = (authorization:string):void => {
    const token = JWT.validateToken(authorization);
    if (!token) {
      throw new Unauthorized('Usuario não autorizado');
    }
  };

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
}
