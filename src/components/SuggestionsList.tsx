import { type GeoLocation } from "../types/GeoLocation";

interface SuggestionsListProps {
  suggestions: GeoLocation[];
  loading: boolean;
  query: string;
  activeIndex: number;
  onSelect: (location: GeoLocation) => void;
}

export const SuggestionsList = ({
  suggestions,
  loading,
  query,
  activeIndex,
  onSelect,
}: SuggestionsListProps) => {
  if (!query.trim()) return null;

  return (
    <ul
      id="search-suggestions"
      role="listbox"
      className="absolute z-20 w-full mt-1 bg-white rounded-xl shadow-lg overflow-hidden"
    >
      {loading && (
        <li className="px-4 py-3 text-gray-400">Searching...</li>
      )}
      {!loading && suggestions.length === 0 && query.trim().length > 1 && (
        <li className="px-4 py-3 text-gray-400">No cities found</li>
      )}
      {!loading &&
        suggestions.map((loc, index) => (
          <li
            key={`${loc.lat}-${loc.lon}`}
            id={`suggestion-${index}`}
            role="option"
            aria-selected={index === activeIndex}
          >
            <button
              type="button"
              className={`w-full text-left px-4 py-3 cursor-pointer transition-colors ${
                index === activeIndex ? "bg-blue-50" : "hover:bg-blue-50"
              }`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onSelect(loc)}
            >
              <span className="font-medium">{loc.name}</span>
              <span className="text-gray-500 ml-1">
                {loc.state ? `${loc.state}, ` : ""}
                {loc.country}
              </span>
            </button>
          </li>
        ))}
    </ul>
  );
};
