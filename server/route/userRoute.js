import express from 'express';
import User from '../model/user.js';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const uploadToCloudinary = async (fileBuffer) => {
    return new Promise((resolve,reject)=> {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'chat-app/avatars'},
            (error, result) => {
                if(error) return reject(error);
                resolve(result);
            }
        );
        stream.end(fileBuffer);
    })
}
export const createUser = async (req, res) => {
    try {
        const { user_name } = req.body;

        if (!user_name) {
            return res.status(400).json({
                success: false,
                message: 'Username is required'
            })
        }

        let user_avatar = null;

        if(req.file){
            const uploadresult = await uploadToCloudinary(req.file.buffer);
            user_avatar = uploadresult.secure_url;
        }
       

        const newUser = new User({
            user_id: uuidv4(),
            user_name,
            user_avatar
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

router.post('/user', upload.single('user_avatar'), createUser);
router.get('/users', getUsers);

export default router;