const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let dbConnection;

module.exports = {
  connectToDatabase: async () => {
    try {
      if (!dbConnection) {
        await client.connect();
        console.log('Successfully connected to MongoDB Atlas');
        dbConnection = client.db(process.env.DB_NAME);
      }
      return dbConnection;
    } catch (error) {
      console.error('Could not connect to MongoDB Atlas', error);
      process.exit(1);
    }
  },
  getDb: () => {
    if (!dbConnection) {
      throw new Error('Database not initialized. Call connectToDatabase first.');
    }
    return dbConnection;
  },
  closeConnection: async () => {
    await client.close();
    dbConnection = null;
  }
};
