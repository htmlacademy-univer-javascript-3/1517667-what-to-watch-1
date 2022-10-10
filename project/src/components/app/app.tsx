import { MainPage } from '../../pages/main-page/main-page';
import { IFilmsList } from '../films-list/films-list';

function App({films} : IFilmsList): JSX.Element {
  return <MainPage films={films}/>;
}

export default App;
