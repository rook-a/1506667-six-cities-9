import MainPage from '../main page/main-page';

type DataMainPageProp = {
  numberOfPlaces: number;
}

function App({numberOfPlaces}: DataMainPageProp): JSX.Element {
  return (
    <MainPage
      numberOfPlaces = {numberOfPlaces}
    />
  );
}

export default App;
