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

//Ini mau dibikin module export aja?
module.exports = {
  createWeatherStation,
  insertSensorReadings,
  getMaxPrecipitation
};