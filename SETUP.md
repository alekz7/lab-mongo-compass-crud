# Node.js MongoDB Atlas Upgrade Setup Guide

This project has been upgraded from a manual MongoDB Compass lab to a fully-functional Node.js API that demonstrates MongoDB CRUD operations through REST endpoints.

## Prerequisites
- Node.js installed.
- A MongoDB Atlas account and a cluster.

## Setup Instructions

### 1. Environment Configuration
1.  Copy `.env.example` to a new file named `.env`.
2.  Update the `MONGODB_URI` with your MongoDB Atlas connection string.
    - Example: `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`

### 2. Install Dependencies
```bash
npm install
```

### 3. Seed the Database
This script will automatically read `companies.json` and upload the ~18,000 documents to your Atlas cluster.
```bash
npm run seed
```

### 4. Run the Application
Start the server in development mode (with nodemon):
```bash
npm run dev
```
The server will be running at `http://localhost:3000`.

## API Endpoints
The following endpoints correspond to the 12 queries from the lab:
- `GET /api/v1/query-1`: Find companies named 'Facebook'.
- `GET /api/v1/query-2`: Web companies (name projection).
- `GET /api/v1/query-3`: Twitter details.
- `GET /api/v1/query-4`: Web companies (limit 50).
- `GET /api/v1/query-5`: Enterprise companies founded in 2005.
- `GET /api/v1/query-6`: Founded in 2000 or 20 employees (sorted).
- `GET /api/v1/query-7`: Not web/social (limit 20).
- `GET /api/v1/query-8`: Not founded in June (skip 50).
- `GET /api/v1/query-9`: 50 employees, not web.
- `GET /api/v1/query-10`: Founded on 1st, not 50 employees or web.
- `GET /api/v1/query-11`: Acquisition price 40M.
- `GET /api/v1/query-12`: Acquired in Jan 2014.

## Running Tests
To verify that all queries are working correctly:
```bash
npm test
```
*Note: Tests require a valid `MONGODB_URI` in `.env` and the database to be seeded.*
