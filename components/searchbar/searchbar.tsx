'use client'

import * as React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getSearch } from '@/api'
import { useCoordinatesStore } from '@/store/useWeatherStore'
import SearchBarInput from './searchbar-input'
import SearchSuggest from './search-suggest'

export default function Search() {
    const setCoordinates = useCoordinatesStore((state) => state.setCoordinates);
    const [query, setQuery] = React.useState('');
  
    const {
      data: searchList,
      isLoading,
      error,
    } = useQuery({
      queryKey: ['search', query],
      queryFn: () => getSearch(query),
    });
  
    return (
      <section className="absolute flex flex-col w-full items-center justify-center top-4">
        <SearchBarInput setQuery={setQuery} />
        <SearchSuggest
          searchList={searchList}
          query={query}
          isLoading={isLoading}
          error={error}
          onSelectLocation={(lat, lon) => {
            setCoordinates(lat, lon);
            setQuery('');
          }}
        />
      </section>
    );
  }