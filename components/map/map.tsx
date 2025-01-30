'use client';

import 'leaflet/dist/leaflet.css';
import L, { LatLng } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { useCoordinatesStore } from '@/store/useWeatherStore';

const DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
});

L.Marker.prototype.options.icon = DefaultIcon;

export function FlyToLocation({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();

  useEffect(() => {
    const position = new LatLng(lat, lon);
    map.flyTo(position, map.getZoom(), {
      animate: true,
      duration: 1,
      easeLinearity: 1,
    });
  }, [lat, lon, map]);

  return null;
}

export default function Map() {
  const { lat, lon } = useCoordinatesStore();
  const position: LatLng = new LatLng(lat, lon);
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      className="w-full h-full rounded-xl shadow-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{`Lat: ${lat}, Lon: ${lon}`}</Popup>
      </Marker>
      <FlyToLocation lat={lat} lon={lon} />
    </MapContainer>
  );
}