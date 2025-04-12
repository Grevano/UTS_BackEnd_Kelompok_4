import {
    createWeatherStation,
    insertSensorReadings
  } from "../services/weather-stations-service.js";
  
  export const addWeatherStation = async (req, res) => {
    if (req.user.role !== "student") {
      try {
        const message = await createWeatherStation(req.body);
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
  
  export const addSensorReadingsForStation = async (req, res) => {
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
  