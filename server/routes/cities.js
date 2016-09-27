const router   = require('express').Router();
const passport = require('passport');
const axios    = require('axios');

//todo - encapsulation

const User = require('../models/user');

const BASE_URL          = "http://api.openweathermap.org/data/2.5/";
const API_KEY           = "&APPID=c312c99b6d639e36939b3a94be0232e9";
const FIND_CITY_PATH    = "find?q=";
const CITY_WEATHER_PATH = "forecast/city?units=imperial&q=";


const jwtGateway = passport.authenticate('jwt', {session: false});

router.get('/', jwtGateway, function (req, res) {
  res.send(req.user.cities);
});

router.post('/search', jwtGateway, function (req, res, next) {
  const targetUrl = BASE_URL +
    FIND_CITY_PATH +
    req.body.city +
    API_KEY;
  //todo - validate;

  console.log('sending request to...' + targetUrl);
  axios.get(targetUrl)
    .then(response => {
      console.log('response received');
      let cityList = [];
      if (response.count === 0) res.send(cityList);
      response.data.list.forEach(function (element) {
        let city     = {};
        city.name    = element.name;
        city.country = element.sys.country;
        city.lat     = element.coord.lat;
        city.lon     = element.coord.lon;
        cityList.push(city);
      });
      res.send(cityList);
    });
});

router.get('/city-data', jwtGateway, function (req, res, next) {
  const cities     = req.user.cities;
  var cityDataList = [];
  if (cities.length == 0) {
    res.send(cityDataList);
    res.end();
  }

  cities.forEach(function (city) {
    const cityRequest = city.city + "," + city.country;

    const targetUrl = BASE_URL +
      CITY_WEATHER_PATH +
      cityRequest +
      API_KEY;

    console.log('about to send...');
    console.log(targetUrl);

    //todo - improve brittle approach
    axios.get(targetUrl)
      .then(response => {
        cityDataList.push(response.data);
        if (cityDataList.length === cities.length) {
          res.send(cityDataList);
        }
      })
      .catch(response => {
        console.log(response);
      });
    //todo- error handling.
  });
});

router.delete('/', jwtGateway, function (req, res) {

  newCityList = req.user.cities.filter(function (oldCity) {
    return !((req.body.city == oldCity.city) &&
    (req.body.country == oldCity.country));
  });

  if (newCityList.length == req.user.cities) {
    res.send(req.user);
    return;
  }

  req.user.cities = newCityList;
  req.user.save(function (err, stuff) {
    if (err) throw err;
    res.send(stuff);
  });

});

router.post('/', jwtGateway, function (req, res) {
  const newCity = {
    city: req.body.city,
    country: req.body.country
  };

  cityMatch = req.user.cities.filter(function (oldCity) {
    return (newCity.city == oldCity.city) && (newCity.country == oldCity.country);
  });

  console.log(cityMatch);

  if (cityMatch.length > 0) {
    console.log('were here.');
    res.send(req.user);
    return;
  }

  req.user.cities.push(newCity);
  req.user.save(function (err, stuff) {
    if (err) throw err;
    res.send(stuff);
  });
});

module.exports = router;
