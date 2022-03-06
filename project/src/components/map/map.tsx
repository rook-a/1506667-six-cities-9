import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map';

import { Icon, layerGroup, Marker } from 'leaflet';
import { City, Offer } from '../../types/offer';

import defaultPin from './img/pin.svg';
import activePin from './img/pin-active.svg';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  className: string;
  city: City;
  offers: Offer[];
  selectedOffer: number | null;
}

const defaultIconPin = new Icon({
  iconUrl: defaultPin,
  iconSize: [28, 40],
  iconAnchor: [14, 20],
});

const activeIconPin = new Icon({
  iconUrl: activePin,
  iconSize: [28, 40],
  iconAnchor: [14, 20],
});

function Map({ className, city, offers, selectedOffer }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    const pinGroup = layerGroup();
    if (map) {
      pinGroup.addTo(map);

      map.setView({
        lat: city.location.latitude,
        lng: city.location.longitude,
      });

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.city.location.latitude,
          lng: offer.city.location.longitude,
        });

        marker.setIcon(selectedOffer && offer.id === selectedOffer ? activeIconPin : defaultIconPin).addTo(pinGroup);
      });
    }

    return () => {
      if (map) {
        map.removeLayer(pinGroup);
      }
    };
  }, [map, offers, selectedOffer, city]);

  return <section className={`${className} map`} ref={mapRef} />;
}

export default Map;
