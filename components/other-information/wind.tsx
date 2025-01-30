import Image from 'next/image';
import { FaWind } from 'react-icons/fa6';

export default function Wind({
  otherInfoWeatherList,
  isLoading,
  error,
}: {
  otherInfoWeatherList: { wind?: { deg?: number; speed?: number } };
  isLoading: boolean;
  error: Error | null;
}) {
  // Function to get wind level and description based on speed using the Beaufort scale
  function getWindLevelAndDescription(speed: number) {
    if (speed < 0.3) return { level: 0, desc: 'Calm' };
    if (speed < 1.6) return { level: 1, desc: 'Light Air' };
    if (speed < 3.4) return { level: 2, desc: 'Light Breeze' };
    if (speed < 5.5) return { level: 3, desc: 'Gentle Breeze' };
    if (speed < 8.0) return { level: 4, desc: 'Moderate Breeze' };
    if (speed < 10.8) return { level: 5, desc: 'Fresh Breeze' };
    if (speed < 13.9) return { level: 6, desc: 'Strong Breeze' };
    if (speed < 17.2) return { level: 7, desc: 'High Wind' };
    if (speed < 20.8) return { level: 8, desc: 'Gale' };
    if (speed < 24.5) return { level: 9, desc: 'Strong Gale' };
    if (speed < 28.5) return { level: 10, desc: 'Storm' };
    if (speed < 32.7) return { level: 11, desc: 'Violent Storm' };
    return { level: 12, desc: 'Hurricane' };
  }

  // Get wind speed and direction with optional chaining
  const windSpeed = otherInfoWeatherList?.wind?.speed ?? 0;
  const windDirection = otherInfoWeatherList?.wind?.deg ?? 0;

  // Get the wind level and description based on the wind speed
  const { level, desc } = getWindLevelAndDescription(windSpeed);

  return (
    <div className="h-[180px] w-full bg-neutral-50 rounded-xl shadow-md p-2 md:p-4 flex flex-col justify-between">
      <h3 className="flex items-center gap-x-2 text-[1rem] text-neutral-500">
        <FaWind className="size-5" />
        Wind
      </h3>
      {isLoading ? (
        <span>Loading...</span>
      ) : error ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div className="relative flex items-center justify-center">
            <Image
              src="/compass_body.svg"
              alt="compass"
              width={90}
              height={90}
            />
            <Image
              src="/compass_arrow.svg"
              alt="compass arrow"
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${windDirection}deg)`,
              }}
              width={9}
              height={9}
            />
            <span className="text-[0.6rem] text-neutral-700 font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {windSpeed} m/s
            </span>
          </div>
          <p className="text-[0.8rem] text-neutral-700">
            Wind level {level}, {desc}
          </p>
        </>
      )}
    </div>
  );
}