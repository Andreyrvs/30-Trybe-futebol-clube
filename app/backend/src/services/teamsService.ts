import NotFound from '../errors/NotFound';
import ITeams from '../interfaces/ITeams';
import TeamsModel from '../database/models/teamsModel';
import Teams from '../database/models/Teams';

export default class TeamsService implements ITeams<Teams> {
  constructor(private model: TeamsModel) {
    this.model = model;
  }

  async read():Promise<Teams[]> {
    const teams = await this.model.read();

    return teams;
  }

  async readOne(id:number): Promise<Teams | null> {
    const team = await this.model.readOne(id);

    if (team === null) {
      throw new NotFound('Id not found');
    }
    return team;
  }
}
