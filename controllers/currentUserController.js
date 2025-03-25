import jwt from 'jsonwebtoken';

const currController = (req, res) => {
    // Check the session from cookies (assuming middleware parses it)
    if (!req.cookies.jwt) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    
    // Normally, you’d fetch user details from a database
    jwt.verify(req.cookies.jwt, process.env.SECRET_KEY, (err, authData) => {
        if(err) {
            console.log(err);
            return res.sendStatus(403);
        } else {
            const userid = authData.id;
            const username = authData.username;
            // Validate the required fields
            if (!userid) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            // Process the data
            res.json({username: `${username}`});
            // return res.status(200).json({
            //     message: 'Post created...',
            //     authData
            // });
        }
    });
}

export default currController;