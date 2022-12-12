import getCoordinates from "./geolocation";

interface LocationData {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state: string;
}

const getLocationInfo = async (): Promise<LocationData> => {
    console.log("API KEY:", import.meta.env.VITE_WEATHER_API_KEY);

    const coords = await getCoordinates();
    const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&limit=1&appid=8ee5f11c428c074f5c9d91722a66b37c`,
    );

    const data = await response.json();
    console.log("Data in Geocoding => ", data[0]);
    return data[0];
};

export default getLocationInfo;
