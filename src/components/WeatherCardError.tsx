import { RemoveButton } from "./RemoveButton";

type WeatherCardErrorProps = {
  error: string;
  city?: string;
  onRemove?: (city: string) => void;
};

export const WeatherCardError = ({ error, city, onRemove }: WeatherCardErrorProps) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden w-full relative">
      {city && onRemove && (
        <RemoveButton city={city} onRemove={onRemove} />
      )}
      <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-white">Weather Unavailable</div>
            <span className="text-red-100">{error}</span>
          </div>
          <div className="text-5xl">⚠️</div>
        </div>
      </div>
    </div>
  );
};
