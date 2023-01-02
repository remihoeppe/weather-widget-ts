import { CustomError, ErrorMessage } from "./error";
import getCoordinates from "./geolocation";

interface LocationData {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state: string;
}

const getLocationInfo = async (): Promise<
    LocationData | CustomError | undefined
> => {
    console.log("API KEY:", import.meta.env.VITE_WEATHER_API_KEY);

    try {
        const coords: any = await getCoordinates();
        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&limit=1&appid=8ee5f11c428c074f5c9d91722a66b37c`,
        );
        if (!response) throw new Error("Somehing wrong happened");
        const data = await response.json();
        return data[0];
    } catch (error) {
        if (error) {
            throw new Error(ErrorMessage.servorErrorMessage);
        }
    }
};

export default getLocationInfo;
