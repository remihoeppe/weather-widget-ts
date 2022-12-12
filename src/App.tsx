import "./App.css";
import WeatherEditor from "./components/WeatherEditor/WeatherEditor";
import WeatherWidget from "./components/WeatherWidget";
import { theme } from "./components/styles/Theme";

import { StyledContainer } from "./components/styles/Container.styles";
import { Separator } from "./components/styles/Separator.styles";

export function App() {
    return (
        <>
            <StyledContainer>
                <WeatherEditor />
                <Separator
                    width="1px"
                    height="60%"
                    color={theme.colors.primaryBorder}
                />
                <WeatherWidget />
            </StyledContainer>
            <h3>Created by - Remi Hoeppe</h3>
        </>
    );
}

export default App;
