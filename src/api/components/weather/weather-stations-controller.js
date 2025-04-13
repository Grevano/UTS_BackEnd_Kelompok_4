const {
    createWeatherStation,
    insertSensorReadings
  } = require("./weather-stations-service.js");
  
  const addWeatherStation = async (req, res) => {
    if (req.user?.role !== "student") {
      try {
        const message = await createWeatherStation(req.body);
        res.status(201).json({ message });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
      }
    } else {
      return res.status(401).json({ message: "You are not authorised to access this content" });
    }
  };
  
  const addSensorReadingsForStation = async (req, res) => {
    if (req.user?.role !== "student") {
      try {
        const message = await insertSensorReadings(req.params.deviceName, req.body);
        res.status(200).json({ message });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
      }
    } else {
      return res.status(401).json({ message: "You are not authorised to access this content" });
    }
  };
  
  module.exports = {
    addWeatherStation,
    addSensorReadingsForStation
  };