const request = require('request'),

dotenv = require('dotenv');
dotenv.config();

const API_KEY = process.env.API_KEY;


function getWeatherData(url, cb) {
    url += `&appid=${API_KEY}&units=metric`;

    request(url, (err, res) => {
        if (err) return cb(err)
        cb(null, res.body)
    })
}

module.exports.getWeather = getWeatherData;