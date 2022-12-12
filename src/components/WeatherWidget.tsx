import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import getLocationInfo from "./../services/geocoding";
import getCurrentWeather, { WeatherResponse } from "./../services/weather";
import { degToCompass, mpsToKph } from "./../services/windUtils";
import { celsiusToFahrenheit } from "./../services/tempUtils";
import { StyledWidget } from "./styles/WeatherWidget.styles";

const WeatherWidget = () => {
    const [userLocation, setUserLocation] = useState<any>();
    const [currentWeather, setCurrentWeather] = useState<any | null>();
    const [iconUrl, setIconUrl] = useState<string>("01n");

    const currentWidgetTitle = useSelector(
        (state: any) => state.titleTextChange.value,
    );
    const currentTemp = useSelector((state: any) => state.tempChange.value);
    const currentWindDisplay = useSelector(
        (state: any) => state.windChange.value,
    );

    const getLocationData = async (): Promise<void> => {
        setUserLocation(await getLocationInfo());
    };

    const getWeatherData = async (): Promise<void> => {
        console.log(
            "userLocation before getCurrentweather is called:",
            userLocation,
        );
        setCurrentWeather(
            await getCurrentWeather(userLocation?.lat, userLocation?.lon),
        );
    };

    useEffect(() => {
        getLocationData();
    }, []);

    useEffect(() => {
        getWeatherData();
    }, [userLocation]);

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

export default WeatherWidget;
