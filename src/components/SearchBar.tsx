import { useState, useRef } from "react";
import { useSuggestions } from "../hooks/useSuggestions";
import { type GeoLocation } from "../types/GeoLocation";
import { SuggestionsList } from "./SuggestionsList";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const { suggestions, loading } = useSuggestions(query);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (location: GeoLocation) => {
    const label = formatLocation(location);
    setQuery(label);
    setOpen(false);
    setActiveIndex(-1);
    onSearch(`${location.name},${location.country}`);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!containerRef.current?.contains(e.relatedTarget)) {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || !suggestions.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          handleSelect(suggestions[activeIndex]);
        }
        break;
      case "Escape":
        setOpen(false);
        setActiveIndex(-1);
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className="mx-auto max-w-7xl mb-6 relative"
      onBlur={handleBlur}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        placeholder="Search for a city (e.g. London)"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls="search-suggestions"
        aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}
        className="w-full px-4 py-3 rounded-xl shadow-md text-lg outline-none focus:ring-2 focus:ring-blue-400"
      />

      {open && (
        <SuggestionsList
          suggestions={suggestions}
          loading={loading}
          query={query}
          activeIndex={activeIndex}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};

function formatLocation(loc: GeoLocation): string {
  const parts = [loc.name];
  if (loc.state) parts.push(loc.state);
  parts.push(loc.country);
  return parts.join(", ");
}
