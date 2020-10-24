// Types
import { FIND_USER, FindUserAction } from './types';

export type FilterUsersState = {
  value: string;
};

const initialState: FilterUsersState = {
  value: '',
};

export const filterUsersReducer = (
  state: FilterUsersState = initialState,
  action: FindUserAction
): FilterUsersState => {
  if (action.type === FIND_USER) {
    return action.payload;
  }
  return state;
};
