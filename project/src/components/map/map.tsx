interface MapProps {
  className: string;
}

function Map({ className }: MapProps): JSX.Element {
  return <section className={`${className} map`} />;
}

export default Map;
