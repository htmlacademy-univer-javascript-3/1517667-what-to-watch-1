import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { allFilms, userFilms } from './mocks/films-lists';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App allFilms={allFilms} userFilms={userFilms}/>
  </React.StrictMode>,
);
