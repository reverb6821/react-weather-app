import { useDebouncedCallback } from 'use-debounce';

export default function SearchBarInput({
  setQuery,
}: {
  setQuery: (query: string) => void;
}) {
  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      const trimmedInput = input.replace(/^\s+/, '');
      setQuery(trimmedInput);
    },
    500
  );

  return (
    <input
      type="text"
      placeholder="Search location"
      onChange={(e) => handleSearch(e)}
      className="relative px-4 py-[6px] w-[80%] md:w-full rounded-xl shadow placeholder-neutral-400 text-neutral-700 placeholder:text-[1rem] text-[1rem] bg-neutral-50"
    />
  );
}