// Redux
import { useDispatch, useSelector } from "react-redux";
import { changeTemp } from "../../redux/tempChange";
import { switchWindDisplay } from "../../redux/windChange";
import { changeTitleText } from "../../redux/titleChange";
//
import { useEffect, useState } from "react";
import NewWeatherEditor from "../NewWeatherEditor/NewWeatherEditor";
import { StyledContainer } from "./../styles/Container.styles";
import NewWeatherWidget from "../NewWeatherWidget/NewWeatherWidget";
import getLocationInfo from "./../../services/geocoding";
import getCurrentWeather from "./../../services/weather";
import { Separator } from "../styles/Separator.styles";
import { theme } from "../styles/Theme";

const WeatherPage = () => {
    const dispatch = useDispatch();

    // Shared Redux Store Read variables
    const currentWidgetTitle = useSelector(
        (state: any) => state.titleTextChange.value,
    );
    const currentTemp = useSelector((state: any) => state.tempChange.value);
    const currentWindDisplay = useSelector(
        (state: any) => state.windChange.value,
    );

    // Handling logic for WeatherEditor

    const [titleInput, setTitleInput] = useState("Widget Title");
    const [tempUnit, setTempUnit] = useState(currentTemp);
    const [isWindDisplayed, setIsWindDisplayed] = useState(true);

    const handleInputChange = (e: any) => setTitleInput(e.target.value);
    const handleChangeTempUnit = (e: any) => {
        setTempUnit(e.target.value);
    };
    const handleWindDisplayChange = (e: any) => {
        setIsWindDisplayed(e.target.value === "On" ? true : false);
    };

    useEffect(() => {
        dispatch(changeTitleText(titleInput));
    }, [titleInput]);

    useEffect(() => {
        dispatch(changeTemp(tempUnit));
    }, [tempUnit]);

    useEffect(() => {
        dispatch(switchWindDisplay(isWindDisplayed));
    }, [isWindDisplayed]);

    useEffect(() => {
        setTempUnit(currentTemp);
        setIsWindDisplayed(currentWindDisplay);
        setTitleInput(currentWidgetTitle);
    }, []);

    ////
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
            <NewWeatherEditor
                onTitleChange={handleInputChange}
                onTempUnitChange={handleChangeTempUnit}
                onWindDisplayChange={handleWindDisplayChange}
                tempUnit={currentTemp}
                isWindOn={isWindDisplayed}
            />
            <Separator
                width="1px"
                height="60%"
                color={theme.colors.primaryBorder}
            />
            <NewWeatherWidget
                currentWeather={currentWeather}
                currentWindDisplay={isWindDisplayed}
                currentTemp={tempUnit}
                currentWidgetTitle={currentWidgetTitle}
                userLocation={userLocation}
            />
        </StyledContainer>
    );
};

export default WeatherPage;
