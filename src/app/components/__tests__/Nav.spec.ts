// Core
import { createMemoryHistory } from 'history';
import { match } from 'react-router-dom';

// Components
import { Nav } from '../Nav';

// Instruments
import {
  makeMountRender,
  reduxify,
  store,
} from '../../../test-utils';

const history = createMemoryHistory();
const path = `/profile/:userName`;

const match: match<{ userName: string }> = {
  isExact: false,
  path,
  url: path.replace(':userName', 'leanne-graham'),
  params: { userName: 'leanne-graham' },
};

const routeComponentPropsMock = (pathname: string) => ({
  location: {
    pathname,
    hash: '',
    key: '',
    search: '',
    state: {},
  },
  history,
  match,
});

describe('<Nav />', () => {
  it('Don\'t render button Home if pathname is "/"', () => {
    const props = routeComponentPropsMock('/');
    const wrapper = makeMountRender(reduxify(Nav, store, props));

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('Render button Home if pathname different then "/"', () => {
    const props = routeComponentPropsMock('/profile');
    const wrapper = makeMountRender(reduxify(Nav, store, props));

    expect(wrapper.html()).toMatchSnapshot();
  });
});
