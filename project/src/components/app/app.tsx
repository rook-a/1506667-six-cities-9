import MainPage from '../../pages/main-page/main-page';

interface AppProps {
  numberOfPlaces: number;
}

function App({ numberOfPlaces }: AppProps): JSX.Element {
  return <MainPage numberOfPlaces={numberOfPlaces} isEmpty={false} />;
}

export default App;
