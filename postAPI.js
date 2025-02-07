import connectAndQuery from "./postgresQuery.js";



function post(userId, title, content){
    console.log(`INSERT INTO Posts (postid, userid, title, content) VALUES ((SELECT COUNT(*) FROM Posts), ${userId}, '${title}', '${content}');`);
    connectAndQuery(`INSERT INTO Posts (postid, userid, title, content) VALUES ((SELECT COUNT(*) FROM Posts), ${userId}, '${title}', '${content}');`);
}

async function getPost(postid){
    console.log(`SELECT * FROM Posts WHERE postid = ${postid}`);
    const result =  await connectAndQuery(`SELECT * FROM Posts WHERE postid = ${postid}`);
    console.log("posts Gotten:", result.rows);
    return result.rows;
}



export { post, getPost};