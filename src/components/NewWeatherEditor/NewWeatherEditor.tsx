interface NewWeatherEditorProps {
    onTitleChange: (e: any) => void;
    onTempUnitChange: (e: any) => void;
    onWindDisplayChange: (e: any) => void;
    tempUnit: string;
    isWindOn: boolean;
}

const NewWeatherEditor = ({
    onTitleChange,
    onTempUnitChange,
    onWindDisplayChange,
    tempUnit,
    isWindOn,
}: NewWeatherEditorProps) => {
    // Add error handling for empty string or undefined Widget Title using the error prop of the TextField component
    const error = false;
    const errorMessage = "Please enter a Title for your widget";

    return (
        <form>
            <label htmlFor="widget-title">Title</label>
            <input
                type="text"
                onChange={onTitleChange}
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
                        checked={tempUnit === "C"}
                        onChange={onTempUnitChange}
                    />
                    °C
                </label>

                <label htmlFor="tempF">
                    <input
                        type="radio"
                        name="fahrenheit"
                        id="tempF"
                        value="F"
                        checked={tempUnit === "F"}
                        onChange={onTempUnitChange}
                    />
                    °F
                </label>
            </div>

            {/* Radio selectors for Wind Speed Display switch */}
            <legend>Wind</legend>
            <div>
                <label htmlFor="windOn">
                    <input
                        name="windOn"
                        type="radio"
                        value="On"
                        id="windOn"
                        checked={isWindOn}
                        onChange={onWindDisplayChange}
                    />
                    On
                </label>

                <label htmlFor="windOff">
                    <input
                        name="windOff"
                        type="radio"
                        value="Off"
                        id="windOff"
                        checked={!isWindOn}
                        onChange={onWindDisplayChange}
                    />
                    Off
                </label>
            </div>
        </form>
    );
};

export default NewWeatherEditor;
