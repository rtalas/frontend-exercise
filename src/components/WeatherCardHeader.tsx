type WeatherCardHeaderProps = {
    cityName: string;
    weatherDescription: string;
    icon?: string;
}

export const WeatherCardHeader = ({ cityName, weatherDescription, icon }: WeatherCardHeaderProps) => {
    return (<div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
        <div className="flex items-center justify-between">
            <div>
                <div className="text-2xl font-bold text-white">{cityName}</div>
                <span className="text-blue-100 capitalize">
                    {weatherDescription}
                </span>
            </div>
            {icon && (
                <img
                    src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                    alt={weatherDescription}
                    className="w-16 h-16"
                    loading="lazy"
                />
            )}
        </div>
    </div>);
}