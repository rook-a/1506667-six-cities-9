import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Logo from './logo';

describe('component: Logo', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Logo isFooter={false} />
      </MemoryRouter>,
    );

    expect(screen.getByTitle(/Six cities/i)).toBeInTheDocument();
    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
  });
});
