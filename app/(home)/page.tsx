'use client'

import * as React from 'react'
import Searchbar from '@/components/searchbar'
import TemperatureSection from '@/components/temperature-section'
import DailyForecastSection from '@/components/daily-forecast'
import FiveDayForecastSection from '@/components/five-day-forecast'
import AirPollution from '@/components/air-pollution'
import OtherInformation from '@/components/other-information'
import dynamic from 'next/dynamic'
import GetLocationbyGPS from '@/hook/getLocationByGPS'

const DynamicMap = dynamic(() => import('@/components/map'), {
  ssr: false,
});

export default function Home() {
  return (
   <React.Fragment>
    <main className="min-h-screen relative">
      <div className="md:wrapper relative">
        <Searchbar />
        <div className="flex flex-col md:flex-row md:gap-x-4 w-full md:pt-[70px]">
          <TemperatureSection />
          <div className="flex flex-col gap-y-4 md:gap-y-4 w-full px-2 md:px-0 md:w-[60%] lg:w-[70%]">
            <DailyForecastSection />
            <FiveDayForecastSection />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-2 md:gap-4 px-2 md:px-0 py-4">
          <AirPollution />
          <OtherInformation />
        </div>
        <div className="grid grid-cols-1 w-full gap-2 md:gap-4 px-2 md:px-0 h-[250px] md:h-[500px] pb-4">
          {/* <DynamicMap /> */}
        </div>
      </div>
      <GetLocationbyGPS />
    </main>
   </React.Fragment>
  );
}
