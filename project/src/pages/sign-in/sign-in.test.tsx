import { SignIn } from './sign-in';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import { HistoryRouter } from '../../components/history-router/history-router';
import { AuthorizationStatus } from '../../components/private-route/private-route';

const mockStore = configureMockStore();
const store = mockStore({
  AUTH_INFO: {
    authorizationStatus: AuthorizationStatus.Auth
  }
});

describe('Component: SignIn', () => {
  it('should render "SignIn" when user navigate to "login" url', async () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignIn />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('email'), 'keks@ke.ks');
    await userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue(/keks@ke.ks/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });
});
