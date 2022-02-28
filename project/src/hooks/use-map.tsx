import { useEffect, useState, MutableRefObject } from 'react';
import { Map, TileLayer } from 'leaflet';
import { City } from '../types/offer';

const LAYER_URL = 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/water/EPSG:3857/{z}/{x}/{y}.png';
const LAYER_COPYRIGHT = 'Kaartgegevens &copy; <a href="https://www.kadaster.nl">Kadaster</a>';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: City): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      const layer = new TileLayer(LAYER_URL, {
        attribution: LAYER_COPYRIGHT,
      });

      instance.addLayer(layer);

      setMap(instance);
    }
  }, [mapRef, map, city]);

  return map;
}

export default useMap;
