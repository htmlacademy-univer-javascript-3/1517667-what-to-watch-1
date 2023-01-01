import { MainPage } from '../../pages/main-page/main-page';
import { SignIn } from '../../pages/signIn/signIn';
import { MyList } from '../../pages/my-list/my-list';
import { Film } from '../../pages/movie-page/movie-page';
import { ReviewSection } from '../../pages/review-section/review-section';
import { Player } from '../../pages/player/player';
import { NotFoundError } from '../../pages/not-found-error/not-found-error';
import { PrivateRoute } from '../private-route/private-route';
import { Routes, Route } from 'react-router-dom';
import { HistoryRouter } from '../history-router/history-router';
import { browserHistory } from '../../browser-history';
import { Spinner } from '../spinner/spinner';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/auth-process/selectors';
import { fetchingInProgress } from '../../store/general-data/selector';
import { areFavoriteFilmsInLoading } from '../../store/favorite-data/selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoading = useAppSelector(fetchingInProgress);
  const areFavoritesLoading = useAppSelector(areFavoriteFilmsInLoading);

  if (isDataLoading || areFavoritesLoading) {
    return <Spinner />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/mylist" element={
          <PrivateRoute authStatus={authorizationStatus}>
            <MyList />
          </PrivateRoute>
        }
        />
        <Route path="/films/:id" element={<Film />} />
        <Route path="/films/:id/review" element={
          <PrivateRoute authStatus={authorizationStatus}>
            <ReviewSection />
          </PrivateRoute>
        }
        />
        <Route path="/player/:id" element={<Player />} />
        <Route path="*" element={<NotFoundError />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
