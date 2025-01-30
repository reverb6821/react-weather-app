'use client';
import * as React from 'react'
import { useCoordinatesStore } from '@/store/useWeatherStore'
import { MdMyLocation } from 'react-icons/md'

export default function GetLocationbyGPS() {
  const [isLocationAllowed, setIsLocationAllowed] = React.useState(false);
  const setCoordinates = useCoordinatesStore((state) => state.setCoordinates);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates(latitude, longitude);
          setIsLocationAllowed(true);
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
          setIsLocationAllowed(false);
          alert(`${error.message}, please enable location`);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={handleGetLocation}
        title={isLocationAllowed ? 'Location allowed' : 'Location not allowed'}
        className={`bg-gradient-to-tr text-center p-2 rounded-xl
          ${
            isLocationAllowed
              ? 'from-green-500 via-green-500 to-green-400'
              : 'from-red-500 via-red-500 to-red-400'
          }
          `}
      >
        <MdMyLocation className="size-6 md:size-7 text-neutral-50" />
      </button>
    </div>
  );
}