'use client';

import { getWeather } from '@/api';
import { useCoordinatesStore, useTemperatureStore } from '@/store/useWeatherStore';
import { celvinToCelsius, getDay, getHour } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

export default function TemperatureSection() {
  const { lat, lon } = useCoordinatesStore();
  const setTemperature = useTemperatureStore((state) => state.setTemperature);

  const {
    data: weatherData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: () => getWeather(lat, lon),
  });

  const temperature = weatherData?.main.temp;
  const icon = weatherData?.weather[0].icon;

  useEffect(() => {
    setTemperature(icon, temperature);
  }, [icon, temperature, setTemperature]);

  const isDay = weatherData?.weather[0].icon?.includes('d');

  return (
    <div
      className={`w-full md:w-[40%] lg:w-[30%] flex flex-col items-center pt-14 pb-4 md:py-4 rounded-b-3xl md:rounded-3xl shadow-xl
         ${
           isDay
             ? 'bg-gradient-to-t from-blue-600 via-blue-500 to-blue-600'
             : 'bg-gradient-to-t from-indigo-600 via-indigo-500 to-indigo-600'
         }
         `}
    >
      <h3 className="text-[1.2rem] text-neutral-200 pt-2">
        {isLoading
          ? 'Loading'
          : error
          ? error.message
          : getDay(weatherData?.dt, weatherData?.timezone)}
      </h3>
      <h4 className="text-[0.9rem] text-neutral-300">
        {isLoading
          ? 'Loading'
          : error
          ? error.message
          : getHour(weatherData?.dt, weatherData?.timezone)}
      </h4>
      <Image
        src={
          isLoading
            ? '/tube-spinner.svg'
            : `${weatherData?.weather[0].icon}`
        }
        alt={
          isLoading
            ? 'Loading'
            : error
            ? error.message
            : weatherData?.weather[0].description
        }
        width={500}
        height={500}
        className="size-36 object-contain my-4"
        priority
      />
      <h3 className="text-[1.2rem] text-neutral-200">
        {isLoading ? 'Loading' : error ? error.message : weatherData?.name}
      </h3>
      <h1 className="text-[4rem] text-neutral-100">
        {isLoading
          ? '??'
          : error
          ? error.message
          : celvinToCelsius(weatherData?.main.temp)}
        °
      </h1>
      <h2 className="text-[1rem] text-neutral-300 capitalize">
        {isLoading
          ? 'Loading'
          : error
          ? error.message
          : weatherData?.weather[0].description}
      </h2>
      <div className="flex items-center gap-x-8 text-[1rem] text-neutral-100 mt-4">
        <span className="flex items-center gap-x-2">
          <FaChevronUp className="size-3 text-neutral-300" />
          <span>
            {isLoading
              ? '??'
              : error
              ? error.message
              : celvinToCelsius(weatherData?.main.temp_max)}
            °
          </span>
        </span>
        <span className="flex items-center gap-x-2">
          <FaChevronDown className="size-3 text-neutral-300" />
          <span>
            {isLoading
              ? '??'
              : error
              ? error.message
              : celvinToCelsius(weatherData?.main.temp_min)}
            °
          </span>
        </span>
      </div>
    </div>
  );
}