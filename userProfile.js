import connectAndQuery from "./postgresQuery.js";

async function getUserPosts(userId, limit){
    // connectAndQuery("SELECT * from Posts WHERE userId == "");
    const result =  await connectAndQuery(`SELECT * FROM Posts WHERE userid = ${userId} LIMIT ${limit} OFFSET 0;`);
    console.log("posts Gotten:", result.rows);
    return result.rows;
    
}

export default getUserPosts;