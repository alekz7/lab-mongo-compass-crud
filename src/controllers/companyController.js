const { getDb } = require('../db/connection');

const getCollection = () => {
  const db = getDb();
  return db.collection(process.env.COLLECTION_NAME || 'companies');
};

const controllers = {
  // 1. Find all the companies that include 'Facebook' on the name field.
  query1: async (req, res) => {
    try {
      const results = await getCollection().find({ name: 'Facebook' }).toArray();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 2. Find all the companies which category_code is 'web'. Retrive only their name field:
  query2: async (req, res) => {
    try {
      const results = await getCollection().find({ category_code: 'web' }).project({ name: 1, _id: 0 }).toArray();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 3. Find all the companies named "Twitter", and retrieve only their name, category_code and founded_year fields.
  query3: async (req, res) => {
    try {
      const results = await getCollection().find({ name: 'Twitter' }).project({ name: 1, category_code: 1, founded_year: 1, _id: 0 }).toArray();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 4. Find all the companies who have web as their category_code, but limit the search to 50 companies.
  query4: async (req, res) => {
    try {
      const results = await getCollection().find({ category_code: 'web' }).limit(50).toArray();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 5. Find all the companies which category_code is 'enterprise' and have been founded in 2005. 
  // Retrieve only the name, category_code and founded_year fields.
  query5: async (req, res) => {
    try {
      const results = await getCollection()
        .find({ category_code: 'enterprise', founded_year: 2005 })
        .project({ name: 1, category_code: 1, founded_year: 1, _id: 0 })
        .toArray();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 6. Find all the companies that have been founded on the 2000 or have 20 employees. 
  // Sort them descendingly by their number_of_employees.
  query6: async (req, res) => {
    try {
      const results = await getCollection()
        .find({ $or: [{ founded_year: 2000 }, { number_of_employees: 20 }] })
        .sort({ number_of_employees: -1 })
        .toArray();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 7. Find all the companies that do not include web nor social on their category_code. 
  // Limit the search to 20 documents and retrieve only their name and category_code.
  query7: async (req, res) => {
    try {
      const results = await getCollection()
        .find({ category_code: { $nin: ['web', 'social'] } })
        .project({ name: 1, category_code: 1, _id: 0 })
        .limit(20)
        .toArray();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 8. Find all the companies that were not founded on 'June'. Skip the first 50 results 
  // and retrieve only the founded_month and name fields.
  query8: async (req, res) => {
    try {
      const results = await getCollection()
        .find({ founded_month: { $ne: 6 } })
        .project({ founded_month: 1, name: 1, _id: 0 })
        .skip(50)
        .toArray();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 9. Find all the companies that have 50 employees, but do not correspond to the 'web' category_code.
  query9: async (req, res) => {
    try {
      const results = await getCollection()
        .find({ number_of_employees: 50, category_code: { $ne: 'web' } })
        .toArray();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 10. Find all the companies that have been founded on the 1st of the month, 
  // but does not have either 50 employees nor 'web' as their category_code. 
  // Retrieve only the founded_day and name and limit the search to 5 documents.
  query10: async (req, res) => {
    try {
      const results = await getCollection()
        .find({
          founded_day: 1,
          $nor: [{ number_of_employees: 50 }, { category_code: 'web' }]
        })
        .project({ founded_day: 1, name: 1, _id: 0 })
        .limit(5)
        .toArray();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 11. Find all the companies which the price_amount of the acquisition was 40.000.000. Sort them by name.
  query11: async (req, res) => {
    try {
      const results = await getCollection()
        .find({ 'acquisition.price_amount': 40000000 })
        .sort({ name: 1 })
        .toArray();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 12. Find all the companies that have been acquired on January of 2014. Retrieve only the acquisition and name fields.
  query12: async (req, res) => {
    try {
      const results = await getCollection()
        .find({ 'acquisition.acquired_month': 1, 'acquisition.acquired_year': 2014 })
        .project({ acquisition: 1, name: 1, _id: 0 })
        .toArray();
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = controllers;
