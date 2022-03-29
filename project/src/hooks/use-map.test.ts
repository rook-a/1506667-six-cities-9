import { renderHook } from '@testing-library/react-hooks';
import { Map } from 'leaflet';
import useMap from './use-map';

const rootElement = document.createElement('div');

const fakeCity = {
  location: {
    latitude: 10,
    longitude: 20,
    zoom: 10,
  },
  name: 'Paris',
};

const fakeMapOptions = {
  center: {
    lat: 10,
    lng: 20,
  },
  zoom: 10,
};

const fakeMapRef = {
  all: [],
  current: rootElement,
};

describe('hook: useMap', () => {
  it('should return Map', () => {
    const { result } = renderHook(() => useMap(fakeMapRef, fakeCity));

    expect(result.current).toBeInstanceOf(Map);
    expect(result.current?.options).toEqual(fakeMapOptions);
  });
});
