const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { connectToDatabase, closeConnection } = require('../src/db/connection');

async function seed() {
  const filePath = path.join(__dirname, '../companies.json');
  
  if (!fs.existsSync(filePath)) {
    console.error('companies.json not found in the root directory.');
    process.exit(1);
  }

  const db = await connectToDatabase();
  const collectionName = process.env.COLLECTION_NAME || 'companies';
  const collection = db.collection(collectionName);

  console.log(`Dropping existing collection: ${collectionName}...`);
  try {
    await collection.drop();
  } catch (err) {
    if (err.codeName !== 'NamespaceNotFound') {
      console.error('Error dropping collection:', err);
    }
  }

  console.log('Seeding database... This might take a few moments.');

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let batch = [];
  const BATCH_SIZE = 1000;
  let totalSeeded = 0;

  for await (const line of rl) {
    if (line.trim()) {
      try {
        // Handle EJSON-like MongoDB exports if necessary
        // In many companies.json, $oid and $date are used. 
        // JSON.parse handles them as objects, which the native driver can often handle or requires EJSON.parse.
        // For standard JSON.parse:
        const doc = JSON.parse(line);
        
        // Minor clean up of _id if it's an object with $oid to avoid conflicts during re-import
        if (doc._id && doc._id.$oid) {
          delete doc._id; // Let Mongo generate new IDs or convert them
        }

        batch.push(doc);

        if (batch.length >= BATCH_SIZE) {
          await collection.insertMany(batch);
          totalSeeded += batch.length;
          console.log(`Seeded ${totalSeeded} documents...`);
          batch = [];
        }
      } catch (e) {
        console.error('Error parsing line:', e.message);
      }
    }
  }

  if (batch.length > 0) {
    await collection.insertMany(batch);
    totalSeeded += batch.length;
  }

  console.log(`Successfully seeded ${totalSeeded} documents!`);
  await closeConnection();
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
