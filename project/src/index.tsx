import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store';
import { browserHistory } from './browser-history';
import { HistoryRouter } from './components/history-router/history-router';
import { setInitFilmsInfo, setPromoFilmInfo, checkAuthAction, getFavoriteFilmsAction } from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(setInitFilmsInfo());
store.dispatch(setPromoFilmInfo());
store.dispatch(checkAuthAction());
store.dispatch(getFavoriteFilmsAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
