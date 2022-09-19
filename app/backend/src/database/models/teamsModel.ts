import ITeams from '../../interfaces/ITeams';
import Teams from './Teams';

export default class TeamsModel implements ITeams<Teams> {
  constructor(private model = Teams) {
    this.model = model;
  }

  async read():Promise<Teams[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}
