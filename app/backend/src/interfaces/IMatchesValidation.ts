import { bodyMatches } from './IMatches';

export default interface IMatchesValidation {
  checkDuplicatedTeam:(body:bodyMatches)=>void,
  checkMatches:(body:bodyMatches)=>void
  validate(authorization: string | undefined):unknown,
}
