import { degToCompass, mpsToKph } from "../../services/windUtils";
import { celsiusToFahrenheit } from "../../services/tempUtils";

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
    const weatherIconUrl = `http://openweathermap.org/img/wn/${
        weatherData?.weather?.at(0).icon
    }@2x.png`;

    return (
        <>
            <h2>{widgetTitle ? widgetTitle : "Widget Title"}</h2>

            <div>
                <img src={weatherIconUrl} alt="" />
                <div className="weather-info">
                    <h4>{location?.name}</h4>
                    <h3>
                        {tempUnit === "C"
                            ? Math.round(weatherData?.main?.temp)
                            : Math.round(
                                  celsiusToFahrenheit(weatherData?.main?.temp),
                              )}
                        °{tempUnit}
                    </h3>
                    {isWindOn ? (
                        <p>
                            <span>Wind</span>
                            {`\v${degToCompass(
                                weatherData?.wind?.deg,
                            )} ${mpsToKph(weatherData?.wind?.speed)}km/h`}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
};

export default WeatherWidget;
