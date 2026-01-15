import WeatherCard from "./components/WeatherCard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 w-full py-8 px-4">
      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4">
        <WeatherCard city="Prague,CZ" />
        <WeatherCard city="Barcelona,ES" />
        <WeatherCard city="Banff,CA" />
        <WeatherCard city="Dubai,AE" />
      </div>
    </div>
  );
}

export default App;
