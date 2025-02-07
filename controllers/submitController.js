import jwt from 'jsonwebtoken';
import { post } from "../postAPI.js";

function submitController(req, res){
    console.log("obtained", req.cookies);
    jwt.verify(req.cookies.jwt, process.env.SECRET_KEY, (err, authData) => {
    if(err) {
        
        return res.sendStatus(403);
    } else {
        console.log("INSIDE POST");

        // Extract data from the request body
        const { title, content } = req.body;
        const userid = authData.id;

        // Validate the required fields
        if (!userid || !title || !content) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Process the data
        post(userid, title, content);
        // return res.status(200).json({
        //     message: 'Post created...',
        //     authData
        // });
    }
    });
    return res.status(200).json({ message: 'Data processed successfully' });
}

export default submitController;