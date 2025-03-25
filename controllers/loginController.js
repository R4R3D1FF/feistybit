
import connectAndQuery from '../postgresQuery.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { OAuth2Client } from "google-auth-library";

async function loginController(req, res){

    const {username, password} = req.body;
    const result = await connectAndQuery(`SELECT * FROM users where username = '${username}';`);
    // console.log("RESULT WAS", result);
    if (result.rows.length === 0){
        return res.status(403).send('Invalid Username or Pass');
    }
    if (await bcrypt.compare(password, result.rows[0].password)){
        const token = jwt.sign({ id: result.rows[0].userid, username: username }, process.env.SECRET_KEY, { expiresIn: '1h' });
        
        
        await res.cookie('jwt', token, {
            // domain: 'localhost',
            httpOnly: true,
            sameSite: 'None', // Prevent CSRF attacks
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        // res.json({ jwt: token, message: 'Login successful' });
        res.json({message: 'Login Successful',
            username: `${username}`,
            userid: `${result.rows[0].userid}`
        });
    }
}

async function verifyGoogleToken(token) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log(payload); // Decoded user info
    return payload;
}

async function googleLoginController(req, res){

    const {credential} = req.body;
    let payload;
    try{
        payload = await verifyGoogleToken(credential);
    }
    catch{
        return res.status(403).json({message: 'Invalid google token'});
    }
    let result;
    try{
        result= await connectAndQuery(`SELECT * FROM users where oauth_id = '${payload.sub}';`);
        if (result.rows.length === 0){
            const currentTimestamp = new Date().toISOString();
            const countResult = await connectAndQuery("SELECT COUNT(*) FROM USERS;")
            const id = countResult.rows[0].count;
            await connectAndQuery(`INSERT INTO USERS (userid, username, password, "Date", oauth_id) VALUES (${id}, 'Technical_Ad${id}', '', '${currentTimestamp}', '${payload.sub}');`);
            result= await connectAndQuery(`SELECT * FROM users where oauth_id = '${payload.sub}';`);
        }
    }
    catch(error){
        // console.log(error);
    }

    if (result.rows.length === 0){
        return res.status(403).json({message: 'Invalid google token'});
    }



    const token = jwt.sign({ id: result.rows[0].userid, username: result.rows[0].username }, process.env.SECRET_KEY, { expiresIn: '1h' });
    
    await res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'None', 
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({message: 'Login Successful',
        username: `${result.rows[0].username}`,
        userid: `${result.rows[0].userid}`
    });
    
}

export {loginController, googleLoginController};
