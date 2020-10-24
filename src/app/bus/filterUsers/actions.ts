// Types
import { FIND_USER, FindUserAction, FilterUsers } from './types';

export function findUser(payload: FilterUsers): FindUserAction {
  return {
    type: FIND_USER,
    payload,
  };
}
