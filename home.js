import connectAndQuery from 'postgresQuery.js';
function getHome(userid){
    return connectAndQuery(`SELECT p.*\
        FROM posts p\
        JOIN subscriptions s \
        ON p.postid = s.postid \
        WHERE s.userId = ${userid};`);
    
}