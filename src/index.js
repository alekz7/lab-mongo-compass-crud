const app = require('./app');
const { connectToDatabase } = require('./db/connection');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Check endpoints at http://localhost:${PORT}/api/v1/query-1`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
