# Project Overview
This project is an upgraded **Ironhack lab** that demonstrates **MongoDB CRUD operations** through a **Node.js/Express API**. It has been transformed from a manual GUI-based exercise into a programmatic implementation to showcase software engineering best practices.

The dataset contains over 18,000 documents representing companies from **Crunchbase**.

# Architecture
- **Backend**: Node.js & Express.
- **Database**: MongoDB Atlas (Cloud) using the Native MongoDB Driver for raw query execution.
- **Testing**: Jest & Supertest for endpoint verification.
- **Seeding**: Custom NDJSON processing script to import the 78MB dataset line-by-line.

# Setup & Usage
Detailed setup instructions are provided in **SETUP.md**.

1.  **Configure Atlas**: Set your `MONGODB_URI` in the `.env` file.
2.  **Seed Database**: Run `npm run seed` to populate your Atlas cluster from `companies.json`.
3.  **Start API**: Run `npm run dev` to start the server.
4.  **Test Queries**: Run `npm test` to verify the accuracy of the 12 implemented MongoDB queries.

# API Design
The project exposes 12 endpoints (mapped to the original lab queries) under `/api/v1/query-n`. Each controller demonstrates a specific MongoDB query concept, including:
- Complex filtering (`$or`, `$nor`, `$nin`).
- Projections (limiting fields returned).
- Sorting (ascending/descending).
- Pagination (`skip` and `limit`).
- Nested object querying (e.g., `acquisition.price_amount`).
