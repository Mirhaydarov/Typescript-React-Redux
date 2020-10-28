// Core
import { match } from 'react-router-dom';
import { createMemoryHistory } from 'history';

// Components
import { UserProfile, currentUser } from '../UserProfile';

// Instruments
import {
  makeMountRender,
  reduxify,
  store,
} from '../../../test-utils';

const history = createMemoryHistory();

const match: match<{ userName: string }> = {
  isExact: false,
  path: '',
  url: '',
  params: { userName: 'wrong-name' },
};

describe('<UserProfile />', () => {
  it("Should render an <ErrorIndicator /> if didn't find a match in data", () => {
    const routeComponentPropsMock = {
      location: {} as unknown,
      history,
      match,
    };
    const wrapper = makeMountRender(
      reduxify(UserProfile, store, routeComponentPropsMock)
    );

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('currentUser return true', () => {
    const user = {
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
    };
    const userName = 'leanne-graham';

    const isUser = currentUser(user, userName);

    expect(isUser).toEqual(true);
  });

  it('currentUser return false', () => {
    const userName = 'leanne-graham';

    const isUser = currentUser(undefined, userName);

    expect(isUser).toEqual(false);
  });
});
