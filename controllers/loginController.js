
import connectAndQuery from '../postgresQuery.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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

export default loginController;
