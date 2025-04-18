module.exports = (mongoose) => {
    // Check if the model is already defined
    if (mongoose.models.weatherData) {
      return mongoose.models.weatherData;
    }
    
    // If not, define and return the new model
    return mongoose.model(
      'weatherData',
      new mongoose.Schema({
        deviceName: {
          type: String,
          required: [true, 'deviceName is required']
        },

        precipitation: {
          type: Number,
          required: [true, 'Precipitation is required']
        },
        atmosphericPressure: {
          type: Number,
          required: [true, 'Atmospheric pressure is required']
        },
        latitude: {
          type: Number,
          required: [true, 'Latitude is required']
        },
        longitude: {
          type: Number,
          required: [true, 'Longitude is required']
        },
        temperature: {
          type: Number,
          required: [true, 'Temperature is required']
        },
        time: Date,
        humidity: {
          type: Number,
          required: [true, 'Humidity is required']
        },
        maxWindSpeed: {
          type: Number,
          required: [true, 'Max wind speed is required']
        },
        solarRadiation: {
          type: Number,
          required: [true, 'Solar radiation is required']
        },
        vaporPressure: {
          type: Number,
          required: [true, 'Vapor pressure is required']
        },
        windDirection: {
          type: Number,
          required: [true, 'Wind direction is required']
        }
      })
    );
  };