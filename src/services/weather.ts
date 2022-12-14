import { CustomError, ErrorMessage } from "./error";

export interface WeatherResponse {
    coord: {
        lon: number;
        lat: number;
    };
    weather: [
        {
            id: number;
            main: string;
            description: string;
            icon: string;
        },
    ];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

const getCurrentWeather = async (
    lat: number,
    lon: number,
): Promise<WeatherResponse | CustomError> => {
    // Look at taking a unit param to decide if API call should be done in C or F. Check what is the most economical for API Calls/re renders

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8ee5f11c428c074f5c9d91722a66b37c&units=metric`,
        );
        const data = await response.json();
        return data;
    } catch (error) {
        return {
            message: ErrorMessage.servorErrorMessage,
            resolution: "rejected",
        };
    }
};

export default getCurrentWeather;
