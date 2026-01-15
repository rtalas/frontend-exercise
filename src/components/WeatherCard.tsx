import {
  EyeIcon,
  SunriseIcon,
  SunsetIcon,
  ThermometerIcon,
  WindIcon,
  DropletsIcon,
  GaugeIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { OPEN_WEATHER_API_KEY } from "../constants";

type WeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  id: number;
  name: string;
};

const WeatherCard = ({ city }: { city: string }) => {
  const [data, setData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
      );
      const parsedData = await res.json();
      setData(parsedData);
    };
    getData();
  }, []);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  console.log(data);

  if (!data) return null;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden w-full">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-white">{data.name}</div>
            <span className="text-blue-100 capitalize">
              {data.weather[0].description}
            </span>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
            className="w-16 h-16"
          />
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-100">
          <div className="flex items-center gap-2 text-lg font-semibold text-orange-800 mb-3">
            <ThermometerIcon className="w-5 h-5" />
            Temperature
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-2xl font-bold text-orange-900">
                {data.main.temp}°C
              </div>
              <div className="text-sm text-orange-700">Current</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-orange-800">
                Feels like {data.main.feels_like}°C
              </div>
              <div className="text-sm text-orange-600">
                {data.main.temp_min}°C - {data.main.temp_max}°C
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <GaugeIcon className="min-w-4 w-4" />
              Pressure
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {data.main.pressure} hPa
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <DropletsIcon className="min-w-4 w-4" />
              Humidity
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {data.main.humidity}%
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <WindIcon className="min-w-4 w-4" />
              Wind
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {data.wind.speed} m/s
            </div>
            <div className="text-xs text-gray-500">{data.wind.deg}°</div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <EyeIcon className="min-w-4 w-4" />
              Visibility
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {(data.visibility / 1_000).toFixed(1)} km
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <SunriseIcon className="min-w-4 w-4" />
              <div>
                <div className="text-sm font-medium text-yellow-800">
                  Sunrise
                </div>
                <div className="text-lg font-semibold text-yellow-900">
                  {formatTime(data.sys.sunrise)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SunsetIcon className="min-w-4 w-4" />
              <div>
                <div className="text-sm font-medium text-orange-800">
                  Sunset
                </div>
                <div className="text-lg font-semibold text-orange-900">
                  {formatTime(data.sys.sunset)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
