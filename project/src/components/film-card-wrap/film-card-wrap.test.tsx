import { render, screen } from '@testing-library/react';
import { makeFakeFilm } from '../../utils/mocks';
import { FilmCardWrap } from './film-card-wrap';

const mockFilm = makeFakeFilm();

describe('Component: FilmCardWrap', () => {
  it('should render correctly', () => {
    render(
      <FilmCardWrap
        film={mockFilm}
        fromFilmPage={false}
      >
        <span>Child component</span>
      </FilmCardWrap>
    );

    expect(screen.getByAltText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(/Child component/i)).toBeInTheDocument();
  });
});
