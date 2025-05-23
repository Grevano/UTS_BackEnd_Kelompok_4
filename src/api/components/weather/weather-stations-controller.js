const weatherStationService = require('./weather-stations-service.js');
const { errorTypes, errorResponder } = require('../../../core/errors');
/**Note: Ingat! tambahkan weatherStationService.
 * di depan fungsi yang dipanggil dari weather-station-service.js
 */

const addWeatherStation = async (req, res, next) => {
  if (req.user.role !== "student") {
    try {
      const message = await weatherStationService.createWeatherStation(req.body);
      res.status(200).json({ message });
    } catch (error){
      if (error.name === 'ValidationError') {
        // Membuat array berisi berbagai error
        const errors = Object.values(error.errors).map(err => err.message);
        // Menggabungkan error tersebut dengan koma
        return res.status(400).json({ error: errors.join(', ') });
      }
      console.log(error.message);
      return next(errorResponder(errorTypes.SERVER, error.message));
    }
  } else {
    return next(errorResponder(errorTypes.FORBIDDEN, "You are not authorised to access this content"));
  }
};

const addSensorReadingsForStation = async (req, res, next) => {
  if (req.user.role !== "student") {
    try {
      const message = await weatherStationService.insertSensorReadings(req.params.deviceName, req.body);
      res.status(200).json({ message });
    } catch (error) {
      console.log(error.message);
      return next(errorResponder(errorTypes.SERVER, error.message));
    }
  } else {
    return next(errorResponder(errorTypes.FORBIDDEN, "You are not authorised to access this content"));
  }
};

const getMaxPrecipitation = async (req, res, next) => {
  try {
    const deviceName = req.params.deviceName;
    const result = await weatherStationService.getMaxPrecipitation(deviceName);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    // Cek apakah ada data weather-station bersangkutan
    if (error.message.includes('No data found')) {
      return next(errorResponder(errorTypes.NOT_FOUND, error.message));
    } else {
      return next(errorResponder(errorTypes.SERVER, error.message));
    }
  }
};

const getSensorReadingsByDate = async (req, res, next) => {
  try {
    const { deviceName, date } = req.params;
    const result = await weatherStationService.getReadingsByDateService(deviceName, date);

    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    // Cek apakah ada data weather-station bersangkutan
    if (error.message.includes('No data found')) {
      return next(errorResponder(errorTypes.NOT_FOUND, error.message));
    } else {
      return next(errorResponder(errorTypes.SERVER, error.message));
    }
  }
};

const deleteSensorReadingsInRange = async (req, res, next) => {
  if (req.user.role !== "student") {
    try {
      const deviceName = req.params.deviceName;
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return next(errorResponder(errorTypes.BAD_REQUEST, "startDate and endDate are required query parameters."));
      }

      const { deletedCount, notFound } = await weatherStationService.deleteSensorReadingsInRange(
        deviceName,
        startDate,
        endDate
      );

      if (notFound) {
        return next(errorResponder(errorTypes.NOT_FOUND, "No data found in the provided date range"));
      }

      return res.status(200).json({ message: `${deletedCount} ${deviceName} readings deleted` });
    } catch (error) {
      console.log(error.message);
      return next(errorResponder(errorTypes.SERVER, error.message));
    }
  } else {
    return next(errorResponder(errorTypes.FORBIDDEN, "You are not authorised to access this content"));
  }
};

// ✅ PATCH /weather-stations/:entryID/precipitation
const patchPrecipitation = async (req, res, next) => {
  if (req.user.role !== "student") {
    try {
      const { entryID } = req.params;
      const { precipitation } = req.body;

      if (!precipitation || isNaN(precipitation)) {
        return next(errorResponder(errorTypes.VALIDATION, 'Valid precipitation value is required.'));
      }

      const updated = await weatherStationService.patchPrecipitation(entryID, precipitation);

      if (!updated) {
        return next(errorResponder(errorTypes.NOT_FOUND, 'Entry not found or update failed.'));
      }

      res.status(200).json({
        message: `Precipitation of the ${updated.sensorName} entry was successfully updated to ${updated.precipitation}`,
      });
    } catch (error) {
      console.error('Error updating precipitation:', error);
      return next(errorResponder(errorTypes.SERVER, 'Internal server error.'));
    }
  } else {
    return next(errorResponder(errorTypes.FORBIDDEN, "You are not authorised to access this content"));
  }
};

// ✅ GET /weather-stations/max-temperature
// Get max temperature in data range for all data
// Example response: { "deviceName": "Station-XYZ", "maxTemperature": 50.64 }
const getMaxTemperature = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return next(errorResponder(errorTypes.BAD_REQUEST, "startDate and endDate are required query parameters."));
    }

    const result = await weatherStationService.getMaxTemperatureInRange(startDate, endDate);

    if (result.length === 0) {
      return next(errorResponder(errorTypes.NOT_FOUND, "No data found in the provided date range."));
    }

    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error.message);
    return next(errorResponder(errorTypes.SERVER, error.message));
  }
};


//for testing purposes
async function getStations(request, response, next) {
  try {
    const offset = request.query.offset || 0;
    const limit = request.query.limit || 20;
    const users = await weatherStationService.getStations(offset, limit);

    return response.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

//for testing purposes
async function deleteStation(request, response, next) {
  try {
    const success = await weatherStationService.deleteStation(request.params.id);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete weather'
      );
    }

    return response.status(200).json({ message: 'Weather Station deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  addWeatherStation,
  addSensorReadingsForStation,
  getMaxPrecipitation,
  getSensorReadingsByDate,
  deleteSensorReadingsInRange,
  patchPrecipitation,
  getMaxTemperature,
  getStations,
  deleteStation,
};