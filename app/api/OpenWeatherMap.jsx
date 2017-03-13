var axios = require('axios');

const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=3d57359c34b3779bea4802f8b99f2163';

// 3d57359c34b3779bea4802f8b99f2163

module.exports = {

    getTemp: function(location) {
        var encodedLocation = encodeURIComponent(location);
        var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;

        return axios.get(requestUrl).then(function(res) {
            if (res.data.cod === 200) {
                return res.data.main.temp;
            }
            throw res.data.message;
        }, function(res) {
             throw (res && ((res.response && res.response.data && (res.response.data.message || res.response.data)) || (res.code))) || res;
        });
    },

};