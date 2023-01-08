import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { GenresList } from './genres-list';

const mockStore = configureMockStore();

const store = mockStore({
  GENERAL_DATA: {
    genresList: ['All genres', 'Genre1', 'Genre2'],
    currentGenre: 'All genres',
  }
});

describe('Component: GenresList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <GenresList changeFunction={jest.fn()}/>
      </Provider>,
    );

    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
    expect(screen.getByText(/Genre1/i)).toBeInTheDocument();
    expect(screen.getByText(/Genre2/i)).toBeInTheDocument();
  });

  it('should update genre on click', async () => {
    let updatedGenre = '';
    render(
      <Provider store={store}>
        <GenresList changeFunction={(genre) => {updatedGenre = genre;}}/>
      </Provider>,
    );

    await userEvent.click(screen.getByText('Genre1'));

    expect(updatedGenre).toEqual('Genre1');
  });
});
