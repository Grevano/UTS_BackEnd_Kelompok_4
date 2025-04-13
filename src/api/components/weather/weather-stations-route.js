import express from "express";

import {
  addWeatherStation,
  addSensorReadingsForStation,
  getMaxPrecipitation
} from "./weather-stations-controller.js";

const router = express.Router();

router.post("/", addWeatherStation);
router.post("/:deviceName", addSensorReadingsForStation);
router.get("/:deviceName/max-precipitation", getMaxPrecipitation);

const weatherStationsRoute = router;
export default weatherStationsRoute;
