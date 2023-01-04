import { Temp } from "./../../services/tempUtils";
import { StyledInputText } from "../styles/StyledInput";
import { StyledRadio } from "../styles/StyledRadio";

interface WeatherEditorProps {
    onTitleChange: (e: any) => void;
    onTempUnitChange: (e: any) => void;
    onWindDisplayChange: (e: any) => void;
    tempUnit: string;
    isWindOn: boolean;
}

const WeatherEditor = ({
    onTitleChange,
    onTempUnitChange,
    onWindDisplayChange,
    tempUnit,
    isWindOn,
}: WeatherEditorProps) => {
    // Add error handling for empty string or undefined Widget Title using the error prop of the TextField component
    const error = false;
    const errorMessage = "Please enter a Title for your widget";

    return (
        <form>
            <StyledInputText>
                <label htmlFor="widget-title">Title</label>
                <input
                    type="text"
                    onChange={onTitleChange}
                    id="widget-title"
                    placeholder="Widget Title"
                />
            </StyledInputText>

            {/* Radio selectors for Temperature Units */}
            <legend>Temperature</legend>
            <div>
                <StyledRadio htmlFor="tempC">
                    <input
                        type="radio"
                        id="tempC"
                        value="C"
                        checked={tempUnit === Temp.Celius}
                        onChange={(e) =>
                            tempUnit === Temp.Fahrenheit
                                ? (e.target.checked = true)
                                : false
                        }
                        onClick={onTempUnitChange}
                    />
                    °C
                </StyledRadio>

                <StyledRadio htmlFor="tempF">
                    <input
                        type="radio"
                        id="tempF"
                        value="F"
                        checked={tempUnit === Temp.Fahrenheit}
                        onChange={(e) =>
                            tempUnit === Temp.Celius
                                ? (e.target.checked = true)
                                : false
                        }
                        onClick={onTempUnitChange}
                    />
                    °F
                </StyledRadio>
            </div>

            {/* Radio selectors for Wind Speed Display switch */}
            <legend>Wind</legend>
            <div>
                <StyledRadio htmlFor="windOn">
                    <input
                        type="radio"
                        value="On"
                        id="windOn"
                        checked={isWindOn}
                        onChange={(e) =>
                            isWindOn ? (e.target.checked = true) : false
                        }
                        onClick={onWindDisplayChange}
                    />
                    On
                </StyledRadio>
                <StyledRadio htmlFor="windOff">
                    <input
                        type="radio"
                        value="Off"
                        id="windOff"
                        checked={!isWindOn}
                        onChange={(e) =>
                            isWindOn ? (e.target.checked = true) : false
                        }
                        onClick={onWindDisplayChange}
                    />
                    Off
                </StyledRadio>
            </div>
        </form>
    );
};

export default WeatherEditor;
