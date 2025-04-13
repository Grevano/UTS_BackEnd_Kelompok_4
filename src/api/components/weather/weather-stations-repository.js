const mongoose = require('mongoose');
const weatherDataModel = require('../../../models/weather-schema.js')(mongoose);

/**Note: Ingat! tambahkan 'weatherDataModel.'
 * di depan fungsi yang dipanggil dari ../../../models/weather-schema.js
 */
const createWeatherStationInDB = async (data) => {
  return await weatherDataModel.create(data);
};

const findWeatherStationByDeviceName = async (deviceName) => {
  return await weatherDataModel.find({ deviceName });
};

const insertReadingsForStation = async (data) => {
  return await weatherDataModel.create(data);
};

const findMaxPrecipitationLastFiveMonths = async (deviceName, fiveMonthsAgo) => {
  return await weatherDataModel.aggregate([
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