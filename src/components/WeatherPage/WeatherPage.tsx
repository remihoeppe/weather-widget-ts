import { useEffect, useState } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { changeTemp } from "../../redux/tempChange";
import { switchWindDisplay } from "../../redux/windChange";
import { changeTitleText } from "../../redux/titleChange";
// Components
import WeatherEditor from "../WeatherEditor/WeatherEditor";
import { Separator } from "../styles/Separator.styles";
import WeatherWidget from "./../WeatherWidget/WeatherWidget";
// Functions
import getLocationInfo from "./../../services/geocoding";
import getCurrentWeather from "./../../services/weather";
//Style
import { StyledContainer } from "./../styles/Container.styles";
import { theme } from "../styles/Theme";
import { StyledEditor } from "../styles/WeatherEditor.styles";
import { StyledWidget } from "../styles/WeatherWidget.styles";

const WeatherPage = () => {
    const dispatch = useDispatch();

    // Shared Redux Store Read and state variables
    const currentWidgetTitle = useSelector(
        (state: any) => state.titleTextChange.value,
    );
    const currentTemp = useSelector((state: any) => state.tempChange.value);
    const currentWindDisplay = useSelector(
        (state: any) => state.windChange.value,
    );

    // Handling logic for WeatherEditor

    const handleInputChange = (e: any) =>
        dispatch(changeTitleText(e.target.value));

    const handleChangeTempUnit = (e: any) => {
        dispatch(changeTemp(e.target.value));
    };

    const handleWindDisplayChange = (e: any) => {
        dispatch(switchWindDisplay(e.target.value === "On" ? true : false));
    };

    // Handling logic required for the WeatherWidget

    const [userLocation, setUserLocation] = useState<any>();
    const [currentWeather, setCurrentWeather] = useState<any | null>();

    const getLocationData = async (): Promise<void> => {
        setUserLocation(await getLocationInfo());
    };

    const getWeatherData = async (): Promise<void> => {
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

    return (
        <StyledContainer>
            <StyledEditor>
                <WeatherEditor
                    onTitleChange={handleInputChange}
                    onTempUnitChange={handleChangeTempUnit}
                    onWindDisplayChange={handleWindDisplayChange}
                    tempUnit={currentTemp}
                    isWindOn={currentWindDisplay}
                />
            </StyledEditor>
            <Separator
                width="1px"
                height="60%"
                color={theme.colors.primaryBorder}
            />
            <StyledWidget>
                <WeatherWidget
                    weatherData={currentWeather}
                    isWindOn={currentWindDisplay}
                    tempUnit={currentTemp}
                    widgetTitle={currentWidgetTitle}
                    location={userLocation}
                />
            </StyledWidget>
        </StyledContainer>
    );
};

export default WeatherPage;
