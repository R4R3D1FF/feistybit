

import pg from 'pg';

// PostgreSQL connection configuration
const { Client } = pg;



async function connectAndQuery(s) {
  let result;
  const client = new Client({
    user: process.env.PGUSER,       // Replace with your PostgreSQL username
    host: process.env.PGHOST,           // Replace with your host, e.g., localhost or a remote server
    database: process.env.PGDATABASE,   // Replace with your database name
    password: process.env.PGPASSWORD,   // Replace with your password
    port: 5432, // Default PostgreSQL port
    ssl: {
      rejectUnauthorized: false,
    },
  });
  try {
    // Connect to the database
    await client.connect();
    console.log('Connected to PostgreSQL!');

    // Example query
    console.log(s);
    result = await client.query(s); // Replace with your table name
    console.log('Query Results:', result);

  } catch (err) {
    console.error('Error querying the database:', err);
  } finally {
    // Close the database connection
    await client.end();
    console.log('Disconnected from PostgreSQL.');
    if (result){
      // console.log('Query Results:', result.rows);
      return result;
    }
  }
}

export default connectAndQuery;
