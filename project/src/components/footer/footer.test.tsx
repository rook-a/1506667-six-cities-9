import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Footer from './footer';

describe('component: Header', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(screen.getByTitle(/Six cities/i)).toBeInTheDocument();
    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
  });
});
