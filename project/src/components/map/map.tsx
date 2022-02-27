import { useEffect, useRef } from 'react';
import useMap from '../../hooks/useMap';

import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, Offer } from '../../types/offer';

import defaultPin from './img/pin.svg';
import activePin from './img/pin-active.svg';

interface MapProps {
  className: string;
  city: City;
  offers: Offer[];
  selectedOffer: number | null;
}

const defaultIconPin = new Icon({
  iconUrl: defaultPin,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const activeIconPin = new Icon({
  iconUrl: activePin,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({ className, city, offers, selectedOffer }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.city.location.latitude,
          lng: offer.city.location.longitude,
        });

        marker
          .setIcon(selectedOffer !== null && offer.id === selectedOffer ? activeIconPin : defaultIconPin)
          .addTo(map);
      });
    }
  }, [map, offers, selectedOffer]);

  return <section className={`${className} map`} ref={mapRef} />;
}

export default Map;
