// controllers/weatherController.js

const axios = require('axios');

exports.getWeather = async (req, res) => {
    const { city } = req.query;
    const API_KEY = process.env.WEATHER_API_KEY;

    if (!city) {
        return res.status(400).json({ message: 'City is required' });
    }

    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weather data', error: error.message });
    }
};
