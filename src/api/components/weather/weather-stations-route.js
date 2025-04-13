const express = require("express");

const {
  addWeatherStation,
  addSensorReadingsForStation
} = require("./weather-stations-controller.js");

module.exports = (app) => {
  app.post('/weather-stations', addWeatherStation);
  app.post('/weather-stations/:deviceName', addSensorReadingsForStation);  
};
