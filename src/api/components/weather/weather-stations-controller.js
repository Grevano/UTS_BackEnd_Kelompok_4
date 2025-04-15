const weatherStationService = require('./weather-stations-service.js');
/**Note: Ingat! tambahkan weatherStationService.
 * di depan fungsi yang dipanggil dari weather-station-service.js
 */

//Tolong gantiin frederick gantheng
const addWeatherStation = async (req, res) => {
  if (req.user.role !== "student") {
    try {
      const message = await weatherStationService.createWeatherStation(req.body);
      res.status(200).json({ message });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message });
      }
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(401).json({ message: "You are not authorised to access this content" });
  }
};

const addSensorReadingsForStation = async (req, res) => {
  if (req.user.role !== "student") {
    try {
      const message = await weatherStationService.insertSensorReadings(req.params.deviceName, req.body);
      res.status(200).json({ message });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(401).json({ message: "You are not authorised to access this content" });
  }
};

const getMaxPrecipitation = async (req, res) => {
  try {
    const deviceName = req.params.deviceName;

    const result = await weatherStationService.getMaxPrecipitation(deviceName);

    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

//Mau dibikin module.export aja?
module.exports = {
addWeatherStation,
addSensorReadingsForStation,
getMaxPrecipitation
}