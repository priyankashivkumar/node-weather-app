const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/dea0c5eb2a2d15f41a55b4d0991c5497/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to the server", undefined);
        } else if (body.error) {
            callback("Unable to get the forecast.Try another location", undefined);
        } else {
            callback(undefined,
                body.daily.data[0].summary + " It is currently " + body.currently.temperature +
                " degree fahrenheit out. There is " + body.currently.precipProbability + "% chance of rain. Highest temperature is "+body.daily.data[0].temperatureHigh+
                ". Lowest temperature is "+body.daily.data[0].temperatureLow);
        }

    });
}


module.exports = forecast;