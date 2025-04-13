const weatherData = require('../../../models/weather-schema.js')

const createWeatherStationInDB = async (data) => {
  return await weatherData.create(data);
};

const findWeatherStationByDeviceName = async (deviceName) => {
  return await weatherData.find({ deviceName });
};

const insertReadingsForStation = async (data) => {
  return await weatherData.create(data);
};

const findMaxPrecipitationLastFiveMonths = async (deviceName, fiveMonthsAgo) => {
  return await weatherData.aggregate([
    //memastikan deviceName sama, dan waktu selalu lebih besar daripada fiveMonthsAgo
      {$match: {deviceName, time: {$gte: fiveMonthsAgo}}},
      {
        $group: {
          _id: '$deviceName',
          maxPrecipitation: {$max: '$precipitation'},
          time: {$last: '$time'},
        },
      },
  ]);
};

module.exports = {
  createWeatherStationInDB,
  findWeatherStationByDeviceName,
  insertReadingsForStation,
  findMaxPrecipitationLastFiveMonths
}