const express = require('express');
const weatherStationsController = require('./weather-stations-controller.js')

const router = express.Router();

module.exports = (app) => {
  app.use('/weather', router)
  //Add a new weather station
  router.post("/", weatherStationsController.addWeatherStation);

  //Add sensor readings to the weather station
  router.post("/:deviceName", weatherStationsController.addSensorReadingsForStation);

  //Get maximum precipitation in the last 5 months
  router.get("/:deviceName/max-precipitation", weatherStationsController.getMaxPrecipitation);
}
