import { render, screen } from '@testing-library/react';
import { TabDetails } from './tab-details';
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
        <TabDetails />
      </Provider>
    );

    expect(screen.getByText(/Director/i)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.director)).toBeInTheDocument();
    expect(screen.getByText(/Starring/i)).toBeInTheDocument();
    expect(screen.getByText(/Genre/i)).toBeInTheDocument();
    expect(screen.getByText(/Released/i)).toBeInTheDocument();
  });
});
