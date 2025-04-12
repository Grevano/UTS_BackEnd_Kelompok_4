import {
    createWeatherStationInDB,
    findWeatherStationByDeviceName,
    insertReadingsForStation
  } from "../repositories/weather-stations-repository.js";
  
  export const createWeatherStation = async (data) => {
    await createWeatherStationInDB(data);
    return `Weather station ${data.deviceName} added successfully`;
  };
  
  export const insertSensorReadings = async (deviceName, data) => {
    const existing = await findWeatherStationByDeviceName(deviceName);
  
    if (!existing.length) {
      throw new Error(`Weather station '${deviceName}' not found`);
    }
  
    await insertReadingsForStation(data);
    return `${data.length} ${deviceName} sensor readings added successfully`;
  };
  