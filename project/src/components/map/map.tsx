interface MapProps {
  className: string;
}

function Map({className}: MapProps): JSX.Element {
  return (
    <section className={`${className} map`}></section>
  );
}

export default Map;
