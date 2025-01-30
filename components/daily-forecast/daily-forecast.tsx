'use client';

import { getForecast } from '@/api';
import { useCoordinatesStore, useTemperatureStore } from '@/store/useWeatherStore';
import { celvinToCelsius, getHour } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

export default function DailyForecastSection() {
  const { lat, lon } = useCoordinatesStore();
  const { temp, icon } = useTemperatureStore();

  const {
    data: dailyForecastData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['daily-forecast', lat, lon],
    queryFn: () => getForecast(lat, lon),
  });

  const timezone = dailyForecastData?.city.timezone;

  const isDay = icon ? icon.includes('d') : false;

  return (
    <section className="w-full mx-auto md:m-0 pt-4 md:p-0">
      <h3 className="text-[1rem] text-neutral-500">Daily Forecast</h3>
      <div className="flex items-center gap-x-2 mt-1 overflow-x-auto no-scrollbar px-1 py-2">
        <div
          className={`w-[70px] h-[110px] max-h-[110px] shrink-0 bg-neutral-50 shadow-md rounded-lg flex flex-col items-center justify-center gap-y-2
           ${
             isDay
               ? 'bg-gradient-to-t from-blue-600 via-blue-500 to-blue-600'
               : 'bg-gradient-to-t from-indigo-600 via-indigo-500 to-indigo-600'
           }
            `}
        >
          <span className="text-[0.9rem] text-neutral-300">Now</span>
          <Image
            src={
              isLoading
                ? '/public/images/tube-spinner.svg'
                : `/public/images/${icon}.png?raw=true`
            }
            width={40}
            height={40}
            alt={isLoading ? 'Loading' : icon}
            className="size-10 object-contain"
          />
          <span className="text-[0.9rem] font-bold text-neutral-100">
            {isLoading ? '??' : error ? error.message : celvinToCelsius(temp)}°
          </span>
        </div>
        {isLoading
          ? 'Loading'
          : error
          ? error.message
          : dailyForecastData?.list.slice(0, 8).map(
              (
                {
                  weather,
                  main,
                  dt,
                }: {
                  weather: { icon: string }[];
                  main: { temp: number };
                  dt: number;
                },
                index: number
              ) => (
                <div
                  key={index}
                  className="w-[70px] h-[110px] max-h-[110px] shrink-0 bg-neutral-50 shadow-md rounded-lg flex flex-col items-center justify-center gap-y-2"
                >
                  <span className="text-[0.9rem] text-neutral-500">
                    {getHour(dt, timezone)}
                  </span>
                  <Image
                    src={`@/public/${weather[0].icon}.png`}
                    width={40}
                    height={40}
                    alt={weather[0].icon}
                    className="size-10 object-contain"
                  />
                  <span className="text-[0.9rem] text-neutral-800 font-bold">
                    {celvinToCelsius(main.temp)}°
                  </span>
                </div>
              )
            )}
      </div>
    </section>
  );
}