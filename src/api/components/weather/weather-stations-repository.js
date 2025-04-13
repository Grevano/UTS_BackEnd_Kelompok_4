import weatherData from "../../../models/weather-schema.js";

export const createWeatherStationInDB = async (data) => {
  return await weatherData.create(data);
};

export const findWeatherStationByDeviceName = async (deviceName) => {
  return await weatherData.find({ deviceName });
};

export const insertReadingsForStation = async (data) => {
  return await weatherData.create(data);
};

export const findMaxPrecipitationLastFiveMonths = async (deviceName, fiveMonthsAgo) => {
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

//Mau tambahin module.export aja nggak? Buat remove redundancy
