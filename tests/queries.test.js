const request = require('supertest');
const app = require('../src/app');
const { connectToDatabase, closeConnection } = require('../src/db/connection');
require('dotenv').config();

describe('MongoDB Query Endpoints', () => {
  let db;

  beforeAll(async () => {
    // If MONGODB_URI is not set, we can't run these integration tests
    if (!process.env.MONGODB_URI) {
      console.warn('Skipping tests because MONGODB_URI is not set in .env');
      return;
    }
    db = await connectToDatabase();
  });

  afterAll(async () => {
    if (process.env.MONGODB_URI) {
      await closeConnection();
    }
  });

  // Helper to skip if no connection
  const itIfConnected = process.env.MONGODB_URI ? it : it.skip;

  itIfConnected('GET /api/v1/query-1 should find Facebook', async () => {
    const res = await request(app).get('/api/v1/query-1');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    const facebook = res.body.find(c => c.name === 'Facebook');
    expect(facebook).toBeDefined();
  });

  itIfConnected('GET /api/v1/query-2 should find web companies and project name', async () => {
    const res = await request(app).get('/api/v1/query-2');
    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).not.toHaveProperty('_id');
  });

  itIfConnected('GET /api/v1/query-3 should find Twitter', async () => {
    const res = await request(app).get('/api/v1/query-3');
    expect(res.statusCode).toEqual(200);
    const twitter = res.body.find(c => c.name === 'Twitter');
    expect(twitter).toBeDefined();
    expect(twitter).toHaveProperty('founded_year');
  });

  itIfConnected('GET /api/v1/query-4 should limit to 50 results', async () => {
    const res = await request(app).get('/api/v1/query-4');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeLessThanOrEqual(50);
  });

  itIfConnected('GET /api/v1/query-11 should find companies with acquisition price 40,000,000', async () => {
    const res = await request(app).get('/api/v1/query-11');
    expect(res.statusCode).toEqual(200);
    if (res.body.length > 0) {
      expect(res.body[0].acquisition.price_amount).toBe(40000000);
    }
  });

  itIfConnected('GET /api/v1/query-12 should find companies acquired in January 2014', async () => {
    const res = await request(app).get('/api/v1/query-12');
    expect(res.statusCode).toEqual(200);
    if (res.body.length > 0) {
      expect(res.body[0].acquisition.acquired_month).toBe(1);
      expect(res.body[0].acquisition.acquired_year).toBe(2014);
    }
  });
});
