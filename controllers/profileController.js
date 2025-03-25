import getUserPosts from "../userProfile.js";
import connectAndQuery from "../postgresQuery.js";

async function profileController(req, res){
    // console.log("Inside profile controller");
    // const subreddit = req.params[0]; // Captures the * part (subreddit name)
    // const commentId = req.params[1]; // Captures the :id part (comment ID)
    // console.log(req.params);
    try{
        const resp = await connectAndQuery(`SELECT * from users where username = '${req.params.username}';`);
        // console.log("REACHED");
        if (!resp)
            res.status(404);
        // console.log(resp);
        const rows = await getUserPosts(resp.rows[0].userid, 10);
        
        // console.log(rows);
        res.status(200).json(rows);
    }
    catch(err){
        res.status(404);
    }
}

export default profileController;