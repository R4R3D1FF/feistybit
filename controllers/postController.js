import { getPost } from "../postAPI.js";
import connectAndQuery from "../postgresQuery.js";

async function appendChildren(obj){
    obj.children = (await connectAndQuery(`SELECT * from comments where parentid = ${obj.commentid};`)).rows;
    for (const child of obj.children){
        await appendChildren(child);
    }
}

async function postController(req, res){
    // const subreddit = req.params[0]; // Captures the * part (subreddit name)
    // const commentId = req.params[1]; // Captures the :id part (comment ID)
    try{
        const rows = await getPost(req.params[1]);
        const post = rows[0];
        post.children = (await connectAndQuery(`SELECT * from comments where postid = ${req.params[1]} AND parentid IS NULL;`)).rows;
        for (const child of post.children)
            await appendChildren(child);
        // console.log(post);
        res.status(200).json(post);
        

    }
    catch(err){
        res.status(404);
    }
}

export default postController;