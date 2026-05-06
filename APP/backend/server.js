import express from 'express';
import cors from 'cors';
import Keyv from 'keyv';

const app = express();
const port = 5000;

// Initialize Keyv with SQLite for persistent storage
const keyv = new Keyv('sqlite://database.sqlite');
keyv.on('error', err => console.error('Keyv connection error:', err));

app.use(cors());
app.use(express.json());

// Health Check / Welcome Route
app.get('/', (req, res) => {
    res.json({ status: 'online', message: 'LunarCart Backend API is active.' });
});

// Registration Route
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and password are required' });
        }
        const users = await keyv.get('users') || {};
        if (users[username]) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }
        users[username] = { password }; // Note: In production, hash this password!
        await keyv.set('users', users);
        res.json({ success: true, message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const users = await keyv.get('users') || {};
        const user = users[username];
        if (user && user.password === password) {
            res.json({ success: true, message: 'Login successful', user: { username } });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
});

// Sample route to fetch data from the DB
app.get('/api/cart', async (req, res) => {
    try {
        const cartItems = await keyv.get('cart') || [];
        res.json({ success: true, data: cartItems });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch cart' });
    }
});

// Sample route to add data to the DB
app.post('/api/cart', async (req, res) => {
    try {
        const { item } = req.body;
        let cart = await keyv.get('cart') || [];
        cart.push(item);
        await keyv.set('cart', cart);
        res.json({ success: true, message: 'Item added to LunarCart' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to add item' });
    }
});

app.listen(port, () => {
    console.log(`LunarCart Backend running at http://localhost:${port}`);
});