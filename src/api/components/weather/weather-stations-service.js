const weatherStationRepository = require ('./weather-stations-repository.js');
/**Note: Ingat! tambahkan 'weatherStationRepository.'
 * di depan fungsi yang dipanggil dari weather-station-repository.js
 */
const createWeatherStation = async (data) => {
  await weatherStationRepository.createWeatherStationInDB(data);
  return `Weather station ${data.deviceName} added successfully`;
};

const insertSensorReadings = async (deviceName, data) => {
  const existing = await weatherStationRepository.findWeatherStationByDeviceName(deviceName);

  if (!existing.length) {
    throw new Error(`Weather station '${deviceName}' not found`);
  }

  await weatherStationRepository.insertReadingsForStation(data);
  return `${data.length} ${deviceName} sensor readings added successfully`;
};

const getMaxPrecipitation = async (deviceName) => {
  const fiveMonthsAgo = new Date();
  fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth()-5);

  const result = await weatherStationRepository.findMaxPrecipitationLastFiveMonths(deviceName, fiveMonthsAgo);

  if (result.length == 0){
    throw new Error (`No data found for '${deviceName}' in the last 5 months`)
  }

  const {maxPrecipitation, time} = result[0];
  return {deviceName, maxPrecipitation, time};
};

const getReadingsByDateService = async (deviceName, rawDate) => {
  const date = new Date(rawDate);
  const result = await weatherStationRepository.getReadingsByDateFromDB(deviceName, date);
  if (result.length === 0) {
    throw new Error(`No data found for '${deviceName}' at ${date}`);
  }
  const { temperature, atmosphericPressure, solarRadiation, precipitation } = result[0];
  return { temperature, atmosphericPressure, solarRadiation, precipitation };
};

const deleteSensorReadingsInRange = async (deviceName, rawStartDate, rawEndDate) => {
  const startDate = new Date(rawStartDate);
  const endDate = new Date(rawEndDate);

  const readings = await weatherStationRepository.getReadingIdsInRange(deviceName, startDate, endDate);
  if (readings.length === 0) {
    return { deletedCount: 0, notFound: true };
  }

  const deleteResult = await weatherStationRepository.deleteReadingsByIds(readings.map(r => r._id));
  return { deletedCount: deleteResult.deletedCount, notFound: false };
};

async function getStations(offset,limit){
  return weatherStationRepository.getStations(offset,limit);
}

async function getMaxTemperatureInRange(startDate, endDate) {
  return await weatherStationRepository.findMaxTemperatureInRange(startDate, endDate);
}

//Ini mau dibikin module export aja?
module.exports = {
  createWeatherStation,
  insertSensorReadings,
  getMaxPrecipitation,
  getReadingsByDateService,
  deleteSensorReadingsInRange,
  getStations,
  getMaxTemperatureInRange,
};