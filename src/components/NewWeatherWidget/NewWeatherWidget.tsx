import { degToCompass, mpsToKph } from "./../../services/windUtils";
import { celsiusToFahrenheit } from "./../../services/tempUtils";
import { StyledWidget } from "./../styles/WeatherWidget.styles";

interface WeatherWidgetProps {
    currentWeather: {
        weather: any;
        main: any;
        wind: any;
    };
    currentWindDisplay: boolean;
    currentTemp: string;
    currentWidgetTitle: string;
    userLocation: {
        name: string;
    };
}

const NewWeatherWidget = ({
    currentWeather,
    userLocation,
    currentWidgetTitle,
    currentTemp,
    currentWindDisplay,
}: WeatherWidgetProps) => {
    const weatherIconUrl = `http://openweathermap.org/img/wn/${
        currentWeather?.weather?.at(0).icon
    }@2x.png`;

    return (
        <StyledWidget>
            <h2>{currentWidgetTitle ? currentWidgetTitle : "Widget Title"}</h2>

            <div>
                <img src={weatherIconUrl} alt="" />
                <div className="weather-info">
                    <h4>{userLocation?.name}</h4>
                    <h3>
                        {currentTemp === "C"
                            ? Math.round(currentWeather?.main?.temp)
                            : Math.round(
                                  celsiusToFahrenheit(
                                      currentWeather?.main?.temp,
                                  ),
                              )}
                        °{currentTemp}
                    </h3>
                    {currentWindDisplay ? (
                        <p>
                            <span>Wind</span>
                            {`\v${degToCompass(
                                currentWeather?.wind?.deg,
                            )} ${mpsToKph(currentWeather?.wind?.speed)}km/h`}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </StyledWidget>
    );
};

export default NewWeatherWidget;
