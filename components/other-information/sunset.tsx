import { convertToLocalTime1Arg, getHour } from '@/utils';
import { BsFillSunriseFill, BsFillSunsetFill } from 'react-icons/bs';

export default function Sunset({
  otherInfoWeatherList,
  isLoading,
  error,
}: {
  otherInfoWeatherList: {
    dt: number;
    timezone: number;
    sys: { sunrise: number; sunset: number };
  };
  isLoading: boolean;
  error: Error | null;
}) {
  const currentTime = getHour(
    otherInfoWeatherList?.dt,
    otherInfoWeatherList?.timezone
  );
  const sunsetTime = convertToLocalTime1Arg(otherInfoWeatherList?.sys.sunset);
  const sunriseTime = convertToLocalTime1Arg(otherInfoWeatherList?.sys.sunrise);

  // Ambil jam dari string waktu (format "HH:mm")
  const currentHour = parseInt(currentTime.split(':')[0]);
  const sunriseHour = parseInt(sunriseTime.split(':')[0]);
  const sunsetHour = parseInt(sunsetTime.split(':')[0]);

  const isAfterSunrise = currentHour >= sunriseHour && currentHour < sunsetHour;

  const displayIcon = isAfterSunrise ? (
    <BsFillSunsetFill className="size-5" />
  ) : (
    <BsFillSunriseFill className="size-5" />
  );
  const displayTitle = isAfterSunrise ? 'Sunset' : 'Sunrise';
  const displayTime = isAfterSunrise ? sunsetTime : sunriseTime;

  return (
    <div className="h-[180px] w-full bg-neutral-50 rounded-xl shadow-md p-2 md:p-4 flex flex-col justify-between">
      {isLoading ? (
        <span>Loading...</span>
      ) : error ? (
        <span>{error.message}</span>
      ) : (
        <>
          <h3 className="flex items-center gap-x-2 text-[1rem] text-neutral-500">
            {displayIcon}
            {displayTitle}
          </h3>
          <span className="text-[1.2rem] text-neutral-700 font-bold">
            {displayTime}
          </span>
          <span className="text-[0.8rem] text-neutral-700">
            {isAfterSunrise
              ? `Sunrise: ${sunriseTime}`
              : `Sunset: ${sunsetTime}`}
          </span>
        </>
      )}
    </div>
  );
}