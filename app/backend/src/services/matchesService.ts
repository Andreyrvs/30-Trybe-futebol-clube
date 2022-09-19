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
    if (body.awayTeam === body.homeTeam) {
      throw new Unauthorized('It is not possible to create a match with two equal teams');
    }

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

  async updateOne(id:number): Promise<object> {
    const updatedMatch = await this.model.updateOne(id);

    return updatedMatch;
  }
}
