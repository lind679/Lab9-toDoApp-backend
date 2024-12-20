const express = require('express');
const dotenv = require('dotenv');
const basicAuth = require('basic-auth');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const taskRoutes = require('./routes/taskRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Redirect HTTP to HTTPS in production
if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https') {
            return res.redirect(`https://${req.header('host')}${req.url}`);
        }
        next();
    });
}

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
});
app.use(limiter);

// Basic authentication
app.use((req, res, next) => {
    const user = basicAuth(req);
    const { USERNAME, PASSWORD } = process.env;
    if (!user || user.name !== USERNAME || user.pass !== PASSWORD) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
});

// Routes
app.use('/api', weatherRoutes);
app.use('/', taskRoutes);

module.exports = app;
