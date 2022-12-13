import "./App.css";
import { StyledContainer } from "./components/styles/Container.styles";
import WeatherPage from "./components/WeatherPage/WeatherPage";

export function App() {
    return (
        <>
            <WeatherPage />

            <h3>Created by - Remi Hoeppe</h3>
        </>
    );
}

export default App;
