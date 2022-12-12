// Redux
import { useDispatch, useSelector } from "react-redux";
import { changeTemp } from "../../redux/tempChange";
import { switchWindDisplay } from "../../redux/windChange";
import { changeTitleText } from "../../redux/titleChange";
//
import { useEffect, useState } from "react";
import { StyledEditor } from "../styles/WeatherEditor.styles";

const WeatherEditor = () => {
    const dispatch = useDispatch();

    // Refactor the three variables below in one object with three keys, ach holding a state?
    const currentWidgetTitle = useSelector(
        (state: any) => state.titleTextChange.value,
    );
    const currentTemp = useSelector((state: any) => state.tempChange.value);
    const currentWindDisplay = useSelector(
        (state: any) => state.windChange.value,
    );

    const [titleInput, setTitleInput] = useState("Widget Title");
    const [tempUnit, setTempUnit] = useState(currentTemp);
    const [isWindDisplayed, setIsWindDisplayed] = useState(true);

    const handleInputChange = (e: any) => setTitleInput(e.target.value);
    const handleChangeTempUnit = (e: any) => {
        console.log(currentTemp);
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

    // Add error handling for empty string or undefined Widget Title using the error prop of the TextField component
    const error = false;
    const errorMessage = "Please enter a Title for your widget";

    return (
        <StyledEditor>
            <form>
                <label htmlFor="widget-title">Title</label>
                <input
                    type="text"
                    onChange={handleInputChange}
                    id="widget-title"
                    placeholder="Widget Title"
                />

                {/* Radio selectors for Temperature Units */}
                <legend>Temperature</legend>
                <div>
                    <label htmlFor="tempC">
                        <input
                            type="radio"
                            name="celsius"
                            id="tempC"
                            value="C"
                            checked={currentTemp === "C"}
                            onChange={handleChangeTempUnit}
                        />
                        °C
                    </label>

                    <label htmlFor="tempF">
                        <input
                            type="radio"
                            name="fahrenheit"
                            id="tempF"
                            value="F"
                            checked={currentTemp === "F"}
                            onChange={handleChangeTempUnit}
                        />
                        °F
                    </label>
                </div>

                {/* Radio selectors for Wind Speed Display switch */}
                <legend>Wind</legend>
                <div>
                    <label htmlFor="windOn">
                        <input
                            type="radio"
                            value="On"
                            id="windOn"
                            checked={isWindDisplayed}
                            onChange={handleWindDisplayChange}
                        />
                        On
                    </label>

                    <label htmlFor="windOn">
                        <input
                            type="radio"
                            value="Off"
                            id="windOff"
                            checked={!isWindDisplayed}
                            onChange={handleWindDisplayChange}
                        />
                        Off
                    </label>
                </div>
            </form>
        </StyledEditor>
    );
};

export default WeatherEditor;
