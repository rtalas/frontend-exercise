import { useWeather } from "../hooks/useWeather";
import { WeatherCardHeader } from "./WeatherCardHeader";
import { SunInfo } from "./SunInfo";
import { Temperature } from "./Temperature";
import { AdvancedInfo } from "./AdvancedInfo";
import { WeatherCardSkeleton } from "./WeatherCardSkeleton";
import { WeatherCardError } from "./WeatherCardError";
import { RemoveButton } from "./RemoveButton";

type WeatherCardProps = {
  city: string;
  onRemove: (city: string) => void;
};

export const WeatherCard = ({ city, onRemove }: WeatherCardProps) => {
  const { data, loading, error } = useWeather(city);

  if (loading) {
    return <WeatherCardSkeleton />;
  }

  if (error) {
    return <WeatherCardError error={error} city={city} onRemove={onRemove} />;
  }

  if (!data) {
    return <WeatherCardError error="No weather data available." city={city} onRemove={onRemove} />;
  }

  const weatherData = data.weather?.[0];

  if (!weatherData) {
    return <WeatherCardError error="No weather data available." city={city} onRemove={onRemove} />;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden w-full relative">
      <RemoveButton city={city} onRemove={onRemove} />
      <WeatherCardHeader
        cityName={data.name}
        weatherDescription={weatherData.description}
        icon={weatherData.icon}
      />

      <div className="p-6 space-y-4">
        <Temperature
          current={data.main.temp}
          feelsLike={data.main.feels_like}
          tempMin={data.main.temp_min}
          tempMax={data.main.temp_max}
        />

        <div className="grid grid-cols-2 gap-4">
          <AdvancedInfo type="Pressure" value={`${data.main.pressure} hPa`} />
          <AdvancedInfo type="Humidity" value={`${data.main.humidity}%`} />
          <AdvancedInfo type="Wind" value={`${data.wind.speed} m/s, ${data.wind.deg}°`} />
          <AdvancedInfo type="Visibility" value={`${(data.visibility / 1_000).toFixed(1)} km`} />
        </div>

        <SunInfo sunriseTime={data.sys.sunrise} sunsetTime={data.sys.sunset} timezoneOffset={data.timezone} />
      </div>
    </div>
  );
};