import { ThermometerIcon } from "lucide-react";

type TemperatureProps = {
    current: number;
    feelsLike: number;
    tempMin: number;
    tempMax: number;
};

export const Temperature = ({ current, feelsLike, tempMin, tempMax }: TemperatureProps) => {
    return (<div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-100">
        <div className="flex items-center gap-2 text-lg font-semibold text-orange-800 mb-3">
            <ThermometerIcon className="w-5 h-5" />
            Temperature
        </div>
        <div className="grid grid-cols-2 gap-3">
            <div>
                <div className="text-2xl font-bold text-orange-900">
                    {current}°C
                </div>
                <div className="text-sm text-orange-700">Current</div>
            </div>
            <div>
                <div className="text-lg font-semibold text-orange-800">
                    Feels like {feelsLike}°C
                </div>
                <div className="text-sm text-orange-600">
                    {tempMin}°C - {tempMax}°C
                </div>
            </div>
        </div>
    </div>);
}