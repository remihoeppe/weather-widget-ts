import "./App.css";
import WeatherEditor from "./components/WeatherEditor/WeatherEditor";
import WeatherWidget from "./components/WeatherWidget";
import { theme } from "./components/styles/Theme";

import { StyledContainer } from "./components/styles/Container.styles";
import { Separator } from "./components/styles/Separator.styles";
import WeatherPage from "./components/WeatherPage/WeatherPage";

export function App() {
    return (
        <>
            <StyledContainer>
                <WeatherPage />
            </StyledContainer>
            <h3>Created by - Remi Hoeppe</h3>
        </>
    );
}

export default App;
