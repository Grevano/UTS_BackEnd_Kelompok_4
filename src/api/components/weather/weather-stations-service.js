const {
    createWeatherStationInDB,
    findWeatherStationByDeviceName,
    insertReadingsForStation
  } = require("./weather-stations-repository.js");
  
    const createWeatherStation = async (data) => {
      try {
        await createWeatherStationInDB(data);
        return `Weather station ${data.deviceName} added successfully`;
      } catch (error) {
        throw new Error(`Failed to create weather station: ${error.message}`);
      }
    };
    
    const insertSensorReadings = async (deviceName, data) => {
      try {
        const existing = await findWeatherStationByDeviceName(deviceName);
        if (!existing.length) {
          throw new Error(`Weather station ${deviceName} not found`);
        }
        await insertReadingsForStation(data);
        return `${data.length} ${deviceName} sensor readings added successfully`;
      } catch (error) {
        throw new Error(`Failed to insert sensor readings: ${error.message}`);
      }
    };
  
  module.exports = {
    createWeatherStation,
    insertSensorReadings
  };