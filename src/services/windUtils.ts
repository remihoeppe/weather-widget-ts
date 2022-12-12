export const degToCompass = (deg: number) => {
    const compassSegment = Math.floor(deg / 22.5 + 0.5);
    const cardinals = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
    ];
    return cardinals[compassSegment % 16];
};

export const mpsToKph = (speed: number) => Math.round(speed * 3.6);
