const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  deviceName: String,
  precipitation: Number,
  atmosphericPressure: Number,
  latitude: Number,
  longitude: Number,
  temperature: Number,
  time: String,
  humidity: Number,
  maxWindSpeed: Number,
  solarRadiation: Number,
  vaporPressure: Number,
  windDirection: Number
});

module.exports = mongoose.model('WeatherData', weatherSchema);