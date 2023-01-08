import { render, screen } from '@testing-library/react';
import { TabOverview } from './tab-overview';
import { makeFakeFilm } from '../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Namespace } from '../../types/Namespace';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const mockFilm = makeFakeFilm();

const store = mockStore({
  [Namespace.FilmData]: {
    currentFilm: mockFilm,
    isFilmLoading: false
  }
});

describe('Component: TabDetails', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <TabOverview />
      </Provider>
    );

    expect(screen.getByText(mockFilm.rating)).toBeInTheDocument();
    expect(screen.getByText(`${mockFilm.scoresCount} ratings`)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.description)).toBeInTheDocument();
    expect(screen.getByText(`Director: ${mockFilm.director}`)).toBeInTheDocument();
    expect(screen.getByText(`Starring: ${mockFilm.starring.join(', ')} and other`)).toBeInTheDocument();
  });
});
