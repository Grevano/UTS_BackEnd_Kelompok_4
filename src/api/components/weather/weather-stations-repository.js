import weatherData from "../models/weatherDataModel.js";

export const createWeatherStationInDB = async (data) => {
  return await weatherData.create(data);
};

export const findWeatherStationByDeviceName = async (deviceName) => {
  return await weatherData.find({ deviceName });
};

export const insertReadingsForStation = async (data) => {
  return await weatherData.create(data);
};
