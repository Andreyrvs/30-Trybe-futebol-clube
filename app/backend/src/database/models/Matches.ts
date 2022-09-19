import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Matches extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });

Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'awayTeam' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Matches;
