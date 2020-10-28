// Instruments
import { store } from '../../../test-utils';

// Actions
import { findUser } from '../filterUsers/actions';

// Types
import { FIND_USER } from '../filterUsers/types';

it('filterUsers dispatches the correct action and payload', () => {
  const expectedPayload = {
    type: FIND_USER,
    payload: {
      value: 'test string',
    },
  };

  store.dispatch(findUser({ value: 'test string' }));

  const actions = store.getActions();

  expect(actions).toEqual([expectedPayload]);
});
