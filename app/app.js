const express = require('express'),
    app = express(),
    parser = require('body-parser'),
    logic = require('./logic/data');

app.use(express.static('public'))
app.use(parser.urlencoded({
    extended: false
}));

app.post("/weather", (req, res) => {
    let url;
    //Determine if we use location geodata or the users manually retrieved city
    if (req.body['data[geo]'] !== 'false') {
        url = `http://api.openweathermap.org/data/2.5/weather?lat=${req.body['data[loc][coords][latitude]']}&lon=${req.body['data[loc][coords][longitude]']}`
    } else {
        url = `http://api.openweathermap.org/data/2.5/weather?q=${req.body['data[city]']}`;
    }

    logic.getWeather(url, (err, result) => {
        if (err) return res.send(404);
        res.send(result);
    })
})
app.listen(process.env.PORT || 8080, () => {
    console.log(`The server is up and running on ${process.env.PORT || 8080}`);
})