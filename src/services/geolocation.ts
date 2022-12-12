function getPosition() {
    "use strict";
    return new Promise(function (resolve, reject) {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        var coordinates = {
            latitude: null,
            longitude: null,
            error: false,
        };

        function success(pos: any) {
            coordinates.latitude = pos.coords.latitude;
            coordinates.longitude = pos.coords.longitude;
            resolve(coordinates);
        }

        function fail(error: any) {
            coordinates.error = true;
            reject(coordinates);
        }

        navigator.geolocation.getCurrentPosition(success, fail, options);
    });
}

const getCoordinates = async () => {
    const coordinatesPromise = getPosition();
    const coordinates = await coordinatesPromise;
    return coordinates;
};

export default getCoordinates;
