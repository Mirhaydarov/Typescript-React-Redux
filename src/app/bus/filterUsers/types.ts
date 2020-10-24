export type FilterUsers = { value: string };

export const FIND_USER = 'FIND_USER';
export type FindUserAction = {
  type: typeof FIND_USER;
  payload: FilterUsers;
};
