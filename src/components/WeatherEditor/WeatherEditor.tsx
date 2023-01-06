import { Temp } from "./../../services/tempUtils";
import { StyledInputText } from "../styles/StyledInput";
import { StyledRadio } from "../styles/StyledRadio";
import { ChangeEvent, MouseEventHandler } from "react";

interface WeatherEditorProps {
    onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onTempUnitChange: MouseEventHandler<HTMLInputElement>;
    onWindDisplayChange: MouseEventHandler<HTMLInputElement>;
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
    const handleTempUnitChange = (e: any) => {
        if (tempUnit === Temp.Fahrenheit) e.target.checked = true;
    };

    const handleWindDisplayChange = (e: any) => {
        if (isWindOn) e.target.checked = true;
    };

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
                        value={Temp.Celius}
                        checked={tempUnit === Temp.Celius}
                        onChange={handleTempUnitChange}
                        onClick={onTempUnitChange}
                    />
                    °C
                </StyledRadio>

                <StyledRadio htmlFor="tempF">
                    <input
                        type="radio"
                        id="tempF"
                        value={Temp.Fahrenheit}
                        checked={tempUnit === Temp.Fahrenheit}
                        onChange={handleTempUnitChange}
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
                        onChange={handleWindDisplayChange}
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
                        onChange={handleWindDisplayChange}
                        onClick={onWindDisplayChange}
                    />
                    Off
                </StyledRadio>
            </div>
        </form>
    );
};

export default WeatherEditor;
