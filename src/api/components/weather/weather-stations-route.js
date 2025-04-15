const express = require('express');
const weatherStationsController = require('./weather-stations-controller.js')
const { authenticateToken} = require('../../../utils/AuthenticateToken')
const router = express.Router();

/**Note: Ingat! tambahkan 'weatherStationController.'
 * di depan fungsi yang dipanggil dari weather-station-controller.js
 */
module.exports = (app) => {
  app.use('/weather', router)
  //Add a new weather station
  router.post("/", authenticateToken, weatherStationsController.addWeatherStation);

  //Add sensor readings to the weather station
  router.post("/:deviceName", authenticateToken, weatherStationsController.addSensorReadingsForStation);

  //Get maximum precipitation in the last 5 months
  router.get("/:deviceName/max-precipitation", authenticateToken, weatherStationsController.getMaxPrecipitation);

  //Get weather reading from a specific date
  router.get("/:deviceName/readings/:date", weatherStationsController.getSensorReadingsByDate);

  //Delete weather readings from a range of time
  router.delete("/:deviceName/readings", authenticateToken, weatherStationsController.deleteSensorReadingsInRange);
}
