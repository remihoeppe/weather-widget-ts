import { degToCompass, mpsToKph } from "../../services/windUtils";
import { celsiusToFahrenheit, roundTemp, Temp } from "../../services/tempUtils";

interface WeatherWidgetProps {
    weatherData: {
        weather: any;
        main: any;
        wind: any;
    };
    isWindOn: boolean;
    tempUnit: string;
    widgetTitle: string;
    location: {
        name: string;
    };
}

const WeatherWidget = ({
    weatherData,
    location,
    widgetTitle,
    tempUnit,
    isWindOn,
}: WeatherWidgetProps) => {
    const weatherIcon = weatherData?.weather?.at(0).icon;
    const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    const tempValue =
        tempUnit === Temp.Celius
            ? `${roundTemp(weatherData?.main?.temp)}`
            : `${roundTemp(celsiusToFahrenheit(weatherData?.main?.temp))}`;

    const unitSystem =
        weatherData?.main?.temp !== undefined ? `°${tempUnit}` : "";

    const windDisplay = isWindOn && (
        <p>
            <span>Wind</span>
            {`\v${degToCompass(weatherData?.wind?.deg)} ${mpsToKph(
                weatherData?.wind?.speed,
            )}km/h`}
        </p>
    );

    return (
        <>
            <h2>{widgetTitle || "Widget Title"}</h2>
            <div>
                <img src={weatherIconUrl} alt="" />
                <div className="weather-info">
                    <h4>{location?.name}</h4>
                    <h3>
                        {tempValue}
                        {unitSystem}
                    </h3>
                    {windDisplay}
                </div>
            </div>
        </>
    );
};

export default WeatherWidget;
