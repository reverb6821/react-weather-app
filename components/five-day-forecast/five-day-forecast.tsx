'use client';

import { getForecast } from '@/api';
import { useCoordinatesStore } from '@/store/useWeatherStore';
import { celvinToCelsius } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import Image from 'next/image';

interface DayForecast {
  dt_txt: string;
  main: {
    temp_min: number;
    temp_max: number;
  };
  weather: {
    main: string;
    icon: string;
  }[];
}

export default function FiveDayForecastSection() {
  const { lat, lon } = useCoordinatesStore();

  const {
    data: fiveDayForecastData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['5day-forecast', lat, lon],
    queryFn: () => getForecast(lat, lon),
  });

  const dayForecastList = fiveDayForecastData?.list
    .reduce((acc: DayForecast[], item: DayForecast) => {
      const date = moment(item.dt_txt).format('YYYY-MM-DD');

      const existing = acc.find((day) => day.dt_txt === date);

      if (existing) {
        existing.main.temp_min = Math.min(
          existing.main.temp_min,
          item.main.temp_min
        );
        existing.main.temp_max = Math.max(
          existing.main.temp_max,
          item.main.temp_max
        );
      } else {
        acc.push({
          dt_txt: date,
          main: { temp_min: item.main.temp_min, temp_max: item.main.temp_max },
          weather: item.weather,
        });
      }
      return acc;
    }, [])
    .slice(0, 5);

  const isToday = dayForecastList ? dayForecastList[0].dt_txt : null;
  const isDay = dayForecastList
    ? dayForecastList[0].weather[0].icon.includes('d')
    : null;

  return (
    <section className="w-full mx-auto md:m-0">
      <h3 className="text-[1rem] text-neutral-500">5 Day Forecast</h3>
      <div className="flex items-center gap-x-2 mt-1 overflow-x-auto no-scrollbar px-1 py-2">
        {isLoading
          ? 'Loading...'
          : error
          ? error.message
          : dayForecastList?.map(
              (
                {
                  dt_txt,
                  main: { temp_min, temp_max },
                  weather: [{ icon }],
                }: DayForecast,
                index: number
              ) => (
                <div
                  key={index}
                  className={`w-[70px] h-[110px] max-h-[110px] shrink-0 bg-neutral-50 shadow-md rounded-lg flex flex-col items-center justify-center gap-y-2
                ${
                  isToday === dt_txt
                    ? isDay
                      ? 'bg-gradient-to-t from-blue-600 via-blue-500 to-blue-600'
                      : 'bg-gradient-to-t from-indigo-600 via-indigo-500 to-indigo-600'
                    : ''
                }
                `}
                >
                  <span
                    className={`text-[0.9rem] 
               ${isToday === dt_txt ? 'text-neutral-300' : 'text-neutral-500'}
                `}
                  >
                    {isToday === dt_txt
                      ? 'Today'
                      : moment(dt_txt).format('dddd')}
                  </span>
                  <Image
                    // src={`/${icon}.png`}
                    src={`@/public//public/${icon}.png?raw=true`}
                    width={40}
                    height={40}
                    alt="cloudy"
                    className="size-10 object-contain"
                  />
                  <div
                    className={`flex items-center  ${
                      isToday === dt_txt
                        ? 'text-neutral-100'
                        : 'text-neutral-800'
                    }`}
                  >
                    <span className="text-[0.9rem] font-bold">
                      {celvinToCelsius(temp_min)}
                      °&nbsp;/&nbsp;
                    </span>
                    <span className="text-[0.9rem] font-bold">
                      {celvinToCelsius(temp_max)}°
                    </span>
                  </div>
                </div>
              )
            )}
      </div>
    </section>
  );
}