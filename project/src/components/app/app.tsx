import { MainPage } from '../../pages/main-page/main-page';
import { SignIn } from '../../pages/signIn/sign-in';
import { MyList } from '../../pages/my-list/my-list';
import { FilmPage } from '../../pages/film-page/film-page';
import { ReviewSection } from '../../pages/review-section/review-section';
import { PlayerPage } from '../../pages/player-page/player-page';
import { NotFoundError } from '../../pages/not-found-error/not-found-error';
import { PrivateRoute } from '../private-route/private-route';
import { Routes, Route } from 'react-router-dom';
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
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/mylist" element={
        <PrivateRoute authStatus={authorizationStatus}>
          <MyList />
        </PrivateRoute>
      }
      />
      <Route path="/films/:id" element={<FilmPage />} />
      <Route path="/films/:id/review" element={
        <PrivateRoute authStatus={authorizationStatus}>
          <ReviewSection />
        </PrivateRoute>
      }
      />
      <Route path="/player/:id" element={<PlayerPage />} />
      <Route path="*" element={<NotFoundError />} />
    </Routes>
  );
}

export default App;
