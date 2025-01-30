import { toKMformat } from '@/utils';
import { FaEye } from 'react-icons/fa6';

export default function Visibility({
  otherInfoWeatherList,
  isLoading,
  error,
}: {
  otherInfoWeatherList: {
    visibility: number;
  };
  isLoading: boolean;
  error: Error | null;
}) {
  const visibilityDescription = () => {
    const visibility = toKMformat(otherInfoWeatherList?.visibility);
    if (visibility > 10) return 'Excellent: Clear and vast view';
    if (visibility > 5) return 'Good: Easily navigable';
    if (visibility > 2) return 'Moderate: Some limitations';
    if (visibility <= 2) return 'Poor: Restricted and unclear';
    return 'Unavailable: Visibility data not available';
  };

  return (
    <div className="h-[180px] w-full bg-neutral-50 rounded-xl shadow-md p-2 md:p-4 flex flex-col justify-between">
      <h3 className="flex items-center gap-x-2 text-[1rem] text-neutral-500">
        <FaEye className="size-5" />
        Visibility
      </h3>
      {isLoading ? (
        <span>Loading...</span>
      ) : error ? (
        <span>{error.message}</span>
      ) : (
        <>
          <span className="text-[1.2rem] text-neutral-700 font-bold">
            {toKMformat(otherInfoWeatherList?.visibility)} km
          </span>
          <p className="text-[0.8rem] text-neutral-700">
            {visibilityDescription()}
          </p>
        </>
      )}
    </div>
  );
}