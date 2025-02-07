import { MongoClient } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017'; // MongoDB URI
const client = new MongoClient(uri);

async function insertDocuments() {
  try {
    await client.connect();
    const db = client.db('reddit'); // Replace with your database name
    const collection = db.collection('redditSearchQueries'); // Replace with your collection name

    // Create an array of documents
    const documents = [];
    for (let i = 1; i <= 1000; i++) {
      documents.push({ li1: `Item ${i}` });
    }

    // Insert the documents into the collection
    const result = await collection.insertMany(documents);
    console.log(`${result.insertedCount} documents were inserted`);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

insertDocuments();
