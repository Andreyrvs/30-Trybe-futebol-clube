import Matches from './Matches';

export default class LeaderboadModel {
  constructor(private model = Matches) {
    this.model = model;
  }

  async leaderboards():Promise<Matches[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Matches, as: 'homeTeam', where: { inProgress: 0 } },
      ],
    });

    return matches;
  }
}
