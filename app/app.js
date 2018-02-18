const express = require('express'),
      app = express(),
      parser = require('body-parser'),
      logic = require('./logic/data');

app.use(express.static('public'))      
app.use(parser.urlencoded({ extended: false }));

app.post("/weather", (req, res) => {
    logic.getWeather(parseFloat(req.body['data[coords][latitude]']), parseFloat(req.body['data[coords][longitude]']), (err, result) => {
        if (err) return res.send(404);
        console.log(result)
        res.send(result);
    })
})
app.listen(process.env.PORT || 8080, () => {
    console.log(`The server is up and running on ${process.env.PORT || 8080}`);
})