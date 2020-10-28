// Core
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';

// Components
import { UserList } from '../UserList';

// Instruments
import {
  makeMountRender,
  reduxify,
  mocker,
  store,
  loaderStore,
  errorStore,
  initialState,
} from '../../../test-utils';

// Api
import { api } from '../../../api';
import {
  root,
  rootPhoto,
  photoApiKey,
  lengthPhoto,
} from '../../../api/config';

// Actions
import {
  asyncFetching,
  startFetching,
  stopFetching,
  errorFetching,
  successFetching,
} from '../UserList/actions';
import { history } from '../../init/middleware';

// Types
import {
  USER_LIST_START_FETCHING,
  USER_LIST_STOP_FETCHING,
  USER_LIST_ERROR_FETCHING,
  USER_LIST_SUCCESS_FETCHING,
  USER_LIST_ASYNC_FETCHING,
} from '../UserList/types';

// Routes
import { Routes, pageNotFound } from '../../routes';

describe('<UserList />', () => {
  beforeEach(() => {
    mocker(fetchMock).fetchUsers();
    mocker(fetchMock).fetchUsersPhoto();

    store.clearActions();
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it('Dispatches the correct action and payload', () => {
    const expectedAsyncActions = { type: USER_LIST_ASYNC_FETCHING };
    const expectedStartActions = { type: USER_LIST_START_FETCHING };
    const expectedErrorActions = {
      type: USER_LIST_ERROR_FETCHING,
      error: false,
      payload: { stack: '' },
    };
    const expectedSuccessActions = {
      type: USER_LIST_SUCCESS_FETCHING,
      payload: [...initialState.userList.data],
    };
    const expectedStopActions = { type: USER_LIST_STOP_FETCHING };

    store.dispatch(asyncFetching());
    store.dispatch(startFetching());
    store.dispatch(errorFetching({ stack: '' }));
    store.dispatch(successFetching([...initialState.userList.data]));
    store.dispatch(stopFetching());

    expect(store.getActions()).toEqual([
      expectedAsyncActions,
      expectedStartActions,
      expectedErrorActions,
      expectedSuccessActions,
      expectedStopActions,
    ]);
  });

  it('Fetching is correct', () => {
    api.getUsers.fetch();
    api.getUsersPhoto.fetch();

    expect(fetchMock.called(`${root}/users`)).toBe(true);
    expect(
      fetchMock.called(
        `${rootPhoto}/?key=${photoApiKey}&image_type=photo&per_page=${lengthPhoto}&safesearch=true`
      )
    ).toBe(true);
  });

  it('Matches snapshot', () => {
    const wrapper = makeMountRender(reduxify(Routes, store));

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Allows users to select a profile', () => {
    const wrapper = makeMountRender(reduxify(Routes, store));

    history.push('/profile/leanne-graham');
    wrapper.update();

    wrapper.find('.tableBody > tr').simulate('click');

    wrapper.update();
    expect(window.location.href).toBe(
      'http://localhost/profile/leanne-graham'
    );
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Should render a <Spinner />', () => {
    const wrapper = makeMountRender(reduxify(UserList, loaderStore));

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Should render an <ErrorIndicator />', () => {
    const wrapper = makeMountRender(reduxify(UserList, errorStore));

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Should render a page not found if url to incorrect', (done) => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/wrong-path']}>
          <Routes />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find(pageNotFound)).toHaveLength(1);

    history.push('/wrong-path');
    wrapper.update();

    process.nextTick(() => {
      wrapper.update();
      expect(window.location.href).toBe(
        'http://localhost/wrong-path'
      );
      done();
    });
  });
});
