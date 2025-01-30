import { IoWater } from 'react-icons/io5';

export default function Humidity({
  otherInfoWeatherList,
  isLoading,
  error,
}: {
  otherInfoWeatherList: {
    main: {
      humidity: number;
    };
  };
  isLoading: boolean;
  error: Error | null;
}) {
  const getHumidityDesc = (humidity: number) => {
    if (humidity < 30) return 'Dry: May cause skin irritation';
    if (humidity >= 30 && humidity < 50)
      return 'Comfortable: Ideal for health and comfort';
    if (humidity >= 50 && humidity < 70)
      return 'Moderate: Sticky, may increase allergens';
    if (humidity >= 70) return 'High: Uncomfortable, mold growth risk';
    return 'Unavailable: Humidity data not available';
  };

  return (
    <div className="h-[180px] w-full bg-neutral-50 rounded-xl shadow-md p-2 md:p-4 flex flex-col justify-between">
      <h3 className="flex items-center gap-x-2 text-[1rem] text-neutral-500">
        <IoWater className="size-5" />
        Humidity
      </h3>
      {isLoading ? (
        <span>Loading...</span>
      ) : error ? (
        <span>{error.message}</span>
      ) : (
        <>
          <span className="text-[1.2rem] text-neutral-700 font-bold">
            {otherInfoWeatherList?.main.humidity}%
          </span>
          <p className="text-[0.8rem] text-neutral-700">
            {getHumidityDesc(otherInfoWeatherList?.main.humidity)}
          </p>
        </>
      )}
    </div>
  );
}