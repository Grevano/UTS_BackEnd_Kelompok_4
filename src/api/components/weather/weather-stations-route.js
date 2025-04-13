const express = require('express');
const weatherStationsController = require('./weather-stations-controller.js')
const { authenticateToken} = require('../../../utils/AuthenticateToken')
const router = express.Router();

module.exports = (app) => {
  app.use('/weather', router)
  //Add a new weather station
  router.post("/", authenticateToken, weatherStationsController.addWeatherStation);

  //Add sensor readings to the weather station
  router.post("/:deviceName", authenticateToken, weatherStationsController.addSensorReadingsForStation);

  //Get maximum precipitation in the last 5 months
  router.get("/:deviceName/max-precipitation", authenticateToken, weatherStationsController.getMaxPrecipitation);
}
