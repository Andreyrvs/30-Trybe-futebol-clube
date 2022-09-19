import JWT from '../../Auth/jwt';
import Unauthorized from '../../errors/Unauthorized';
import { bodyMatches } from '../../interfaces/IMatches';
import IMatchesValidation from '../../interfaces/IMatchesValidation';

export default class MatchesValidation implements IMatchesValidation {
  checkDuplicatedTeam = (body: bodyMatches):void => {
    if (body.awayTeam === body.homeTeam) {
      throw new Unauthorized('It is not possible to create a match with two equal teams');
    }
  };

  validate = (authorization:string):void => {
    if (!authorization.includes('.')) {
      throw new Unauthorized('Token must be a valid token');
    }

    const token = JWT.validateToken(authorization);
    if (!token) {
      throw new Unauthorized('Token must be a valid token');
    }
  };

  checkMatches = (body: bodyMatches):void => {
    this.checkDuplicatedTeam(body);
  };
}
