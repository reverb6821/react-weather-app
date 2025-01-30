'use client';

import { getWeather } from '@/api';
import { useCoordinatesStore } from '@/store/useWeatherStore';
import { useQuery } from '@tanstack/react-query';
import Sunset from './sunset';
import Wind from './wind';
import Visibility from './visibility';
import Pressure from './pressure';
import Humidity from './humidity';

export default function OtherInformation() {
  const { lat, lon } = useCoordinatesStore();

  const {
    data: otherInfoWeatherList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['otherInfoWeather', lat, lon],
    queryFn: () => getWeather(lat, lon),
  });

  return (
    <>
      <Sunset
        otherInfoWeatherList={otherInfoWeatherList}
        isLoading={isLoading}
        error={error}
      />
      <Wind
        otherInfoWeatherList={otherInfoWeatherList}
        isLoading={isLoading}
        error={error}
      />
      <Humidity
        otherInfoWeatherList={otherInfoWeatherList}
        isLoading={isLoading}
        error={error}
      />
      <Visibility
        otherInfoWeatherList={otherInfoWeatherList}
        isLoading={isLoading}
        error={error}
      />
      <Pressure
        otherInfoWeatherList={otherInfoWeatherList}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
}