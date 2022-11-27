import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { ErrorMessage } from './components/error/error';
import { store } from './store';
import { setInitFilmsInfo, checkAuthAction } from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(setInitFilmsInfo());
store.dispatch(checkAuthAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>
);
