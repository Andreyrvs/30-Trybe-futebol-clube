import IMatches, { bodyMatches } from '../../interfaces/IMatches';
import Matches from './Matches';
import Teams from './Teams';

export default class MatchesModel implements IMatches<Matches> {
  constructor(private model = Matches) {
    this.model = model;
  }

  async create(body: bodyMatches):Promise<Matches> {
    const newMatches = await this.model.create({
      homeTeam: body.homeTeam,
      awayTeam: body.awayTeam,
      homeTeamGoals: body.homeTeamGoals,
      awayTeamGoals: body.awayTeamGoals,
      inProgress: body.inProgress,
    });

    return newMatches;
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

  async updateOne(id: number):Promise<object> {
    const updatedMatch = await this.model.update({ inProgress: 0 }, {
      where: { id },
    });

    if (updatedMatch === null) return {};
    return { message: 'Finished' };
  }

  async updateGoals(id: number, body: bodyMatches):Promise<object> {
    const updatedGoals = await this.model.update({
      homeTeamGoals: body.homeTeamGoals, awayTeamGoals: body.awayTeamGoals }, {
      where: { id },
    });

    return updatedGoals;
  }
}
