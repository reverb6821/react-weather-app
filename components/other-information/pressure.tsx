import { IoSpeedometer } from 'react-icons/io5';

export default function Pressure({
  otherInfoWeatherList,
  isLoading,
  error,
}: {
  otherInfoWeatherList: {
    main: {
      pressure: number;
    };
  };
  isLoading: boolean;
  error: Error | null;
}) {
  const getPressureDescription = (pressure: number) => {
    if (pressure < 1000) return 'Very low pressure';

    if (pressure >= 1000 && pressure < 1015)
      return 'Low pressure. Expect weather changes.';

    if (pressure >= 1015 && pressure < 1025)
      return 'Normal pressure. Expect weather changes.';

    if (pressure >= 1025 && pressure < 1040)
      return 'High pressure. Expect weather changes.';

    if (pressure >= 1040) return 'Very high pressure. Expect weather changes.';

    return 'Unavailable pressure data';
  };
  return (
    <div className="h-[180px] w-full bg-neutral-50 rounded-xl shadow-md p-2 md:p-4 flex flex-col justify-between">
      <h3 className="flex items-center gap-x-2 text-[1rem] text-neutral-500">
        <IoSpeedometer className="size-5" />
        Pressure
      </h3>
      {isLoading ? (
        <span>Loading...</span>
      ) : error ? (
        <span>{error.message}</span>
      ) : (
        <>
          <span className="text-[1.2rem] text-neutral-700 font-bold">
            {otherInfoWeatherList?.main.pressure} hPa
          </span>
          <p className="text-[0.8rem] text-neutral-700">
            {getPressureDescription(otherInfoWeatherList?.main.pressure)}
          </p>
        </>
      )}
    </div>
  );
}