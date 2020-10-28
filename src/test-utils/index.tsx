/* eslint-disable import/no-extraneous-dependencies */
// Core
import React, { ElementType, ReactElement } from 'react';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount, MountRendererProps, ReactWrapper } from 'enzyme';
import { FetchMockStatic } from 'fetch-mock';

// Api
import {
  root,
  rootPhoto,
  photoApiKey,
  lengthPhoto,
} from '../api/config';

// Types
import { HttpErrorType, UsersList } from '../app/bus/UserList/types';
import { FilterUsers } from '../app/bus/filterUsers/types';

type initialStateTypes = {
  userList: {
    data: UsersList;
    postData: UsersList;
    isFetching: boolean;
    error: boolean | HttpErrorType;
  };
  filterUsers: FilterUsers;
};

export const initialState: initialStateTypes = {
  userList: {
    data: [
      {
        id: 1,
        name: 'Leanne Graham',
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031 x56442',
        image:
          'https://cdn.pixabay.com/user/2020/10/03/07-51-18-705_250x250.jpg',
        address: {
          street: 'Kulas Light',
          city: 'Gwenborough',
        },
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
        },
      },
    ],
    postData: [
      {
        id: 1,
        name: 'Leanne Graham',
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031 x56442',
        image:
          'https://cdn.pixabay.com/user/2020/10/03/07-51-18-705_250x250.jpg',
        address: {
          street: 'Kulas Light',
          city: 'Gwenborough',
        },
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
        },
      },
    ],
    isFetching: false,
    error: false,
  },
  filterUsers: {
    value: '',
  },
};

const mockStore = configureStore();

export const store = mockStore(initialState);

export const loaderStore = mockStore({
  ...initialState,
  userList: {
    ...initialState.userList,
    isFetching: true,
  },
});

export const errorStore = mockStore({
  ...initialState,
  userList: {
    ...initialState.userList,
    error: true,
  },
});

export const makeMountRender = (
  Component: ElementType,
  props?: MountRendererProps
): ReactWrapper => mount(<Component {...props} />);

export const reduxify = (
  Component: ElementType,
  defaultStore: MockStore,
  defaultProps?: unknown
) => {
  return function reduxWrap(): ReactElement {
    return (
      <Provider store={defaultStore}>
        <Router>
          <Component {...defaultProps} />
        </Router>
      </Provider>
    );
  };
};

type MockerReturnTypes = {
  fetchUsers: () => MockerReturnTypes;
  fetchUsersPhoto: () => MockerReturnTypes;
};

export const mocker = (
  apiMock: FetchMockStatic
): MockerReturnTypes => ({
  fetchUsers() {
    apiMock.get(`${root}/users`, initialState.userList.data);
    return this;
  },
  fetchUsersPhoto() {
    apiMock.get(
      `${rootPhoto}/?key=${photoApiKey}&image_type=photo&per_page=${lengthPhoto}&safesearch=true`,
      {
        hits: [
          {
            userImageURL:
              'https://cdn.pixabay.com/user/2020/10/03/07-51-18-705_250x250.jpg',
          },
        ],
      }
    );
    return this;
  },
});
