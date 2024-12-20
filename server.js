const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
