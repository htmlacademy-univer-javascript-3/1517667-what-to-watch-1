import { MainPage } from '../../pages/main-page/main-page';
import { SignIn } from '../../pages/signIn/signIn';
import { MyList } from '../../pages/my-list/my-list';
import { Film } from '../../pages/movie-page/movie-page';
import { ReviewSection } from '../../pages/review-section/review-section';
import { Player } from '../../pages/player/player';
import { NotFoundError } from '../../pages/not-found-error/not-found-error';
import { AuthorizationStatus, PrivateRoute } from '../private-route/private-route';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { Spinner } from '../spinner/spinner';
import { IState } from '../../reducer';
import { useAppSelector } from '../../hooks';

function App(): JSX.Element {
  const { isDataLoaded } = useAppSelector((state: IState) => state);

  if (!isDataLoaded) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/mylist" element={
          <PrivateRoute authStatus={AuthorizationStatus.NoAuth}>
            <MyList />
          </PrivateRoute>
        }
        />
        <Route path="/films/:id" element={<Film />} />
        <Route path="/films/:id/review" element={<ReviewSection />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/addreview/:id" element={<ReviewSection />} />
        <Route path="*" element={<NotFoundError />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
