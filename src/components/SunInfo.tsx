import { SunriseIcon, SunsetIcon } from "lucide-react";
import { formatTime } from "../utils/formatTime";

type SunInfoProps = {
    sunriseTime: number;
    sunsetTime: number;
    timezoneOffset: number;
}

export const SunInfo = ({ sunriseTime, sunsetTime, timezoneOffset }: SunInfoProps) => {
    return (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <SunriseIcon className="min-w-4 w-4" />
              <div>
                <div className="text-sm font-medium text-yellow-800">
                  Sunrise
                </div>
                <div className="text-lg font-semibold text-yellow-900">
                  {formatTime(sunriseTime, timezoneOffset)}
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
                  {formatTime(sunsetTime, timezoneOffset)}
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}