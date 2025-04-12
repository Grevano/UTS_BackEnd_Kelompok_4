import express from "express";

import {
  addWeatherStation,
  addSensorReadingsForStation
} from "../controllers/weather-stations-controller.js";

const router = express.Router();

router.post("/", addWeatherStation);
router.post("/:deviceName", addSensorReadingsForStation);

const weatherStationsRoute = router;
export default weatherStationsRoute;
