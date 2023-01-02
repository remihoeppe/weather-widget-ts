export const roundTemp = (temp: number | undefined) => {
    return temp !== undefined ? Math.round(temp) : "Data not available";
};

export const celsiusToFahrenheit = (tempInC: number) => {
    return tempInC * 1.8 + 32;
};
