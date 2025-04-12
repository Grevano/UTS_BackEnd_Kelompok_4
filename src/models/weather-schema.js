module.exports = (mongoose) =>
    mongoose.model(
      'Weather',
      new mongoose.Schema({
        deviceName: String,
        precipitation: {
            type: String,
            double: true
        },
        
        atmosphericPressure: {
            type: String,
            doubel: true
        },

        latitude: {
            type: String,
            doubel: true
        },

        longitude: {
            type: String,
            double: true
        },

        temperature: {
            type: Number,
            double: true
        },

        time: Date,

        humidity: {
            type: Number,
            double: true
        },

        maxWindSpeed: {
            type: Number,
            double: true
        },

        solarRadiation: {
            type: Number,
            double: true
        },

        vaporPressure: {
            type: Number,
            double: true    
        },

        windDirection: {
            type: Number,
            double: true
        }
      })
    );
  