import { MainPage } from '../../pages/mainPage/mainPage';
import { IFilmsList } from '../filmsList/filmsList';

function App({films} : IFilmsList): JSX.Element {
  return <MainPage films={films}/>;
}

export default App;
