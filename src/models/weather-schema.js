module.exports = (mongoose) => {
    // Check if the model is already defined
    if (mongoose.models.weatherData) {
      return mongoose.models.weatherData;
    }
    
    // If not, define and return the new model
    return mongoose.model(
      'weatherData',
      new mongoose.Schema({
        deviceName: String,
        precipitation: {
          type: Number
        },
        atmosphericPressure: {
          type: Number
        },
        latitude: {
          type: Number
        },
        longitude: {
          type: Number
        },
        temperature: {
          type: Number
        },
        time: Date,
        humidity: {
          type: Number
        },
        maxWindSpeed: {
          type: Number
        },
        solarRadiation: {
          type: Number
        },
        vaporPressure: {
          type: Number
        },
        windDirection: {
          type: Number
        }
      })
    );
  };