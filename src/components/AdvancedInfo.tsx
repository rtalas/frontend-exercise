import { GaugeIcon, DropletsIcon, WindIcon, EyeIcon } from "lucide-react";

export type AdvancedInfoType = "Pressure" | "Humidity" | "Wind" | "Visibility";

type AdvancedInfoProps = {
    type: AdvancedInfoType;
    value: string;
};

export const AdvancedInfo = ({ type, value }: AdvancedInfoProps) => {
    return (
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                {getAdvancedInfoIcon(type)}
                {type}
            </div>
            <div className="text-lg font-semibold text-gray-900">
                {value}
            </div>
        </div>
    );
}

const getAdvancedInfoIcon = (type: AdvancedInfoType) => {
    switch (type) {
        case "Pressure":
            return <GaugeIcon className="min-w-4 w-4" />;
        case "Humidity":
            return <DropletsIcon className="min-w-4 w-4" />;
        case "Wind":
            return <WindIcon className="min-w-4 w-4" />;
        case "Visibility":
            return <EyeIcon className="min-w-4 w-4" />;
    }
}
