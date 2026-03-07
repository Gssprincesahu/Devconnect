import express from 'express';
import User from '../model/user.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

export const createUser = async (req, res) => {
    try {
        const { user_name, user_avatar } = req.body;

        if (!user_name) {
            return res.status(400).json({
                success: false,
                message: 'Username is required'
            })
        }

        const user_id = uuidv4();

        const newUser = new User({
            user_id,
            user_name,
            user_avatar: user_avatar || null
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User logged in successfully',
            data: newUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to save user data',
            error: error.message
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

router.post('/user', createUser);
router.get('/users', getUsers);

export default router;

/* import express from 'express';
import User from '../model/user.js';

const router = express.Router();

// POST route to create/login user
router.post('/user', async (req, res) => {
    try {
        const { user_name, user_avatar } = req.body;

        if (!user_name) {
            return res.status(400).json({ 
                success: false, 
                message: 'Username is required' 
            });
        }

        // Create new user
        const newUser = new User({
            user_name,
            user_avatar: user_avatar || null
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User logged in successfully',
            data: {
                id: newUser._id,
                user_name: newUser.user_name,
                user_avatar: newUser.user_avatar,
                createdAt: newUser.createdAt
            }
        });

    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save user data',
            error: error.message
        });
    }
});

// GET route to fetch all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: error.message
        });
    }
});

export default router;
*/

