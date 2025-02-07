import connectAndQuery from "../postgresQuery.js";

async function upvotePost(postid){
    const result =  await connectAndQuery(`UPDATE Posts SET upvotes = upvotes + 1 WHERE postid = ${postid}`);
    
}

async function unupvotePost(postid){
    const result =  await connectAndQuery(`UPDATE Posts SET upvotes = upvotes - 1 WHERE postid = ${postid}`);
    
}

async function downvotePost(postid){
    const result =  await connectAndQuery(`UPDATE Posts SET downvotes = downvotes + 1 WHERE postid = ${postid}`);
    
}

async function undownvotePost(postid){
    const result =  await connectAndQuery(`UPDATE Posts SET downvotes = downvotes - 1 WHERE postid = ${postid}`);
    
}


async function votePutController(req, res){
    console.log("INSIDE POST");
    console.log(req.body);
    // Extract data from the request body
    const { postid, vote } = req.body;

    if (vote)
        upvotePost(postid);
    else
        downvotePost(postid);

    // Send a response
    res.status(200).json({ message: 'Data processed successfully' });
}

async function voteDeleteController(req, res){
    console.log("INSIDE POST");
    console.log(req.body);
    // Extract data from the request body
    const { postid, vote } = req.body;

    if (vote)
        unupvotePost(postid);
    else
        undownvotePost(postid);

    // Send a response
    res.status(200).json({ message: 'Data processed successfully' });
}


export {votePutController, voteDeleteController};