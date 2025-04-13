const weatherData = require("../../../models/weather-schema.js");

const createWeatherStationInDB = async (data) => {
  return await weatherData.create(data);
};

const findWeatherStationByDeviceName = async (deviceName) => {
  return await weatherData.find({ deviceName });
};

const insertReadingsForStation = async (data) => {
  return await weatherData.create(data);
};

module.exports = {
  createWeatherStationInDB,
  findWeatherStationByDeviceName,
  insertReadingsForStation
}; 