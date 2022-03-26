import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

import Tabs from './tabs';

import { CITIES } from '../../utils/const';

describe('component: Tabs', () => {
  it('should render correctly', () => {
    const mockStore = configureMockStore();

    render(
      <Provider store={mockStore({})}>
        <Tabs city={'Paris'} />
      </Provider>,
    );

    expect(screen.getAllByTestId('cityName')).toHaveLength(CITIES.length);
  });
});
