const express = require('express');
const weatherStationsController = require('./weather-stations-controller.js')
const { isAdmin } = require('../../../utils/AdminChecker')
const { authenticateToken} = require('../../../utils/AuthenticateToken')
const router = express.Router();

/**Note: Ingat! tambahkan 'weatherStationController.'
 * di depan fungsi yang dipanggil dari weather-station-controller.js
 */
module.exports = (app) => {
  app.use('/weather-stations', router);
  //Add a new weather station
  router.post("/", authenticateToken, weatherStationsController.addWeatherStation);

  //Add sensor readings to the weather station
  router.post("/:deviceName", authenticateToken, weatherStationsController.addSensorReadingsForStation);

  //Get maximum precipitation in the last 5 months
  router.get("/:deviceName/max-precipitation", authenticateToken, weatherStationsController.getMaxPrecipitation);

  //Get weather reading from a specific date
  router.get("/:deviceName/readings/:date",authenticateToken, weatherStationsController.getSensorReadingsByDate);

//Get maximum temperature in data range for all data
  app.get("/:deviceName/max-temperature", authenticateToken, weatherStationsController.getMaxTemperature);

//Delete weather readings from a range of time
  router.delete("/:deviceName/readings", authenticateToken, weatherStationsController.deleteSensorReadingsInRange);

  // ✅ Update precipitation by entry ID
  router.patch("/:entryID/precipitation", authenticateToken, weatherStationsController.patchPrecipitation);

  //for testing purposes, get all weatherStations
  router.get("/",authenticateToken, weatherStationsController.getStations);
};
