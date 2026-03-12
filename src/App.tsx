import { WeatherCard } from "./components/WeatherCard";
import { SearchBar } from "./components/SearchBar";
import { useCities } from "./hooks/useCities";

function App() {
  const { cities, addCity, removeCity } = useCities();

  const handleSearch = (city: string) => {
    if (city) addCity(city);
  };

  return (
    <div className="min-h-screen bg-gray-100 w-full py-8 px-4">
      <SearchBar onSearch={handleSearch} />

      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4">
        {cities.map((city) => (
          <WeatherCard key={city} city={city} onRemove={removeCity} />
        ))}
      </div>
    </div>
  );
}

export default App;
