
import connectAndQuery from '../postgresQuery.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

async function registerController(req, res){

    const { username, password } = req.body;
    const result = await connectAndQuery("SELECT COUNT(*) FROM USERS;")
    const id = result.rows[0].count;
    // Validate user input (basic validation)
    if (!id || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash password before saving (use bcrypt for hashing)
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Insert user into database
        const result = await connectAndQuery(`INSERT INTO USERS (userid, username, password) VALUES (${id}, '${username}', '${hashedPassword}');`);
        
        // Check if the insert was successful
        if (!result) {
            return res.status(500).json({ message: 'User registration failed' });
        }

        // Create a token
        const token = jwt.sign({ id, username }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Set JWT cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'strict', // Prevent CSRF attacks
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.json({ message: 'Registration successful', token });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error registering user' });
    }

    
}

export default registerController;
