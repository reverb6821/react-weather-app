'use client';

import { getAirPollution } from '@/api';
import { useCoordinatesStore } from '@/store/useWeatherStore';
import { useQuery } from '@tanstack/react-query';
import { FaMaskFace } from 'react-icons/fa6';

const AQI_CONFIG = {
  1: {
    value: 5,
    description: 'Good (AQI 1): The air quality is good.',
    color: 'bg-green-500',
  },
  2: {
    value: 25,
    description:
      'Fair (AQI 2): The air quality is fair. Its safe for most people.',
    color: 'bg-yellow-500',
  },
  3: {
    value: 50,
    description:
      'Moderate (AQI 3): Air quality is moderate. Sensitive groups should limit outdoor activities.',
    color: 'bg-orange-500',
  },
  4: {
    value: 75,
    description:
      'Poor (AQI 4): Limit outdoor activities. Wear a mask if you need to go outside.',
    color: 'bg-red-500',
  },
  5: {
    value: 100,
    description:
      'Very Poor (AQI 5): Stay indoors. Wear a mask if you must go out.',
    color: 'bg-purple-500',
  },
} as const;

export default function AirPollution() {
  const { lat, lon } = useCoordinatesStore();

  const {
    data: airPollutionData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['airPollution', lat, lon],
    queryFn: () => getAirPollution(lat, lon),
  });

  const AQI = airPollutionData?.list[0]?.main.aqi;
  const aqiInfo = AQI ? AQI_CONFIG[AQI as keyof typeof AQI_CONFIG] : null;

  return (
    <div className="h-[180px] w-full bg-neutral-50 rounded-xl shadow-md p-2 md:p-4 flex flex-col justify-between">
      <h3 className="flex items-center gap-x-2 text-[1rem] text-neutral-500">
        <FaMaskFace className="size-5" />
        Air Pollution
      </h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <div className="relative w-full">
            <div
              className="w-full h-2 md:h-3 rounded-full"
              style={{
                background:
                  'linear-gradient(to right, #22c55e, #eab308, #f97316, #ef4444, #a855f7)',
              }}
            />
            <div
              className={`absolute size-2 md:size-3 rounded-full top-0 -translate-y-1/4 transition-all duration-300
            ${aqiInfo?.color} border-2 border-white`}
              style={{
                left: `${aqiInfo?.value}%`,
                transform: `translateX(${
                  aqiInfo?.value === 100 ? '-100%' : '-50%'
                })`,
              }}
            />
          </div>
          <p className="text-[0.8rem] text-neutral-700">
            {aqiInfo?.description}
          </p>
        </>
      )}
    </div>
  );
}