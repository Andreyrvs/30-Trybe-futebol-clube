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

  async readOne(id: number): Promise<Teams | null> {
    const team = await this.model.findByPk(id);

    return team;
  }

  async leaderboard():Promise<Teams[]> {
    const teams = await this.model.findAll({ raw: true });
    return teams;
  }
}
