import {
    createWeatherStationInDB,
    findWeatherStationByDeviceName,
    insertReadingsForStation,
    findMaxPrecipitationLastFiveMonths
  } from "./weather-stations-repository.js";
  
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
  
  export const getMaxPrecipitation = async (deviceName) => {
    const fiveMonthsAgo = new Date();
    fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth()-5);

    const result = await findMaxPrecipitationLastFiveMonths(deviceName, fiveMonthsAgo);

    if (result.length == 0){
      throw new Error (`No data found for '${deviceName}' in the last 5 months`)
    }

    const {maxPrecipitation, time} = result[0];
    return {deviceName, maxPrecipitation, time};
  };

  //Ini mau dibikin module export aja?