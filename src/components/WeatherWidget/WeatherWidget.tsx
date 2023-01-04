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
    const weatherIconUrl = `http://openweathermap.org/img/wn/${
        weatherData?.weather?.at(0).icon
    }@2x.png`;

    const tempInC = roundTemp(weatherData?.main?.temp);
    const tempInF = roundTemp(celsiusToFahrenheit(weatherData?.main?.temp));
    const windDir = degToCompass(weatherData?.wind?.deg);
    const windSpeed = mpsToKph(weatherData?.wind?.speed);

    return (
        <>
            <h2>{widgetTitle ? widgetTitle : "Widget Title"}</h2>

            <div>
                <img src={weatherIconUrl} alt="" />
                <div className="weather-info">
                    <h4>{location?.name}</h4>
                    <h3>
                        {tempUnit === Temp.Celius ? `${tempInC}` : `${tempInF}`}
                        {weatherData?.main?.temp !== undefined
                            ? `°${tempUnit}`
                            : ""}
                    </h3>
                    {isWindOn ? (
                        <p>
                            <span>Wind</span>
                            {`\v${windDir} ${windSpeed}km/h`}
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
