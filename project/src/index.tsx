import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { store } from './store';
import { allFilms, userFilms } from './mocks/films-lists';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <App allFilms={allFilms} userFilms={userFilms}/>
  </Provider>,
);
