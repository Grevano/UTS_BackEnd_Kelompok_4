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

//Menarik bacaan sebuah weather station berdasarkan waktu yang dipilih
const getReadingsByDateFromDB = async (deviceName, date) => {
  return await weatherDataModel.aggregate([
    { $match: { deviceName, time: { $eq: date } } }
  ]);
};

//Untuk melakukan delete
//Menarik id data bacaan cuaca oleh sebuah weather station dari jangkauan tanggal tertentu
const getReadingIdsInRange = async (deviceName, startDate, endDate) => {
  return await weatherDataModel.aggregate([
    { $match: { deviceName: deviceName, time: { $gte: startDate, $lt: endDate } } },
    { $project: { _id: 1 } }
  ]);
};

//Melakukan penghapusan berdasarkan id data bacaan
const deleteReadingsByIds = async (ids) => {
  return await weatherDataModel.deleteMany({ _id: { $in: ids } });
};

// Update precipitation berdasarkan entry ID
const updatePrecipitationById = async (entryID, newPrecipitation) => {
  return await weatherDataModel.findByIdAndUpdate(
    entryID,
    { precipitation: newPrecipitation },
    { new: true }
  );
};

//for testing purposes
async function getStations(offset, limit) {
  return weatherDataModel.find().skip(offset).limit(limit);
}

module.exports = {
  createWeatherStationInDB,
  findWeatherStationByDeviceName,
  insertReadingsForStation,
  findMaxPrecipitationLastFiveMonths,
  getReadingsByDateFromDB,
  getReadingIdsInRange,
  deleteReadingsByIds,
  getStations,
  updatePrecipitationById
}