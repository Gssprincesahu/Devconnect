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

const fallbackGuidance = (message, context = {}) => {
    const question = message.toLowerCase();
    const mentors = context.mentors || [];
    const articles = context.articles || [];
    if (question.includes('mentor') || question.includes('message')) {
        const mentor = mentors.find((item) => item.expertise?.some((skill) => question.includes(skill.toLowerCase()))) || mentors[0];
        if (mentor) return `A strong match is ${mentor.name}, ${mentor.role} at ${mentor.company}. Their strengths include ${mentor.expertise?.join(', ')}.\n\nYou could send: “Hi ${mentor.name}, I am currently learning ${mentor.expertise?.[0] || 'software development'}. I read about your work and would value your advice on what to focus on next. Would you be open to one specific question?”`;
    }
    if (question.includes('summar') || question.includes('article')) {
        const article = articles.find((item) => question.includes(item.title?.toLowerCase())) || articles[0];
        if (article) return `**${article.title}**\n\n${article.subtitle || 'This article shares practical developer experience.'}\n\nKey topics: ${(article.tags || []).join(', ') || article.category}. Read it in DevConnect for the full examples and context.`;
    }
    if (question.includes('profile')) return 'For a stronger developer profile: add a focused one-line bio, 4–6 skills you can demonstrate, links to GitHub and LinkedIn, two project outcomes with measurable impact, and one learning goal. Keep the profile specific enough that a mentor immediately knows how to help you.';
    if (question.includes('dsa')) return 'Start with a 4-week DSA foundation: Week 1 arrays, strings, hashing, and two pointers; Week 2 linked lists, stacks, queues, and binary search; Week 3 trees and recursion; Week 4 graphs and dynamic programming basics. Solve 3–5 curated problems per topic, explain your solution aloud, and keep a revision log.';
    if (question.includes('system design')) return 'For system design, first learn the building blocks: APIs, databases, caching, queues, load balancers, and horizontal scaling. Then practice one small design at a time—URL shortener, chat, or notification service—stating requirements, data model, trade-offs, and failure modes.';
    return 'I can help you learn with a focused next step. Tell me a topic (for example React, DSA, backend, or system design), your current level, and how much time you have each week.';
};

router.post('/assistant', async (req, res) => {
    const { message, history = [], context = {} } = req.body || {};
    if (!message?.trim()) return res.status(400).json({ success: false, message: 'A question is required.' });

    const system = `You are DevGuide AI, the student-focused DevConnect assistant. Help with technical explanations, DSA/web/system-design learning paths, mentor and article recommendations, drafting respectful mentor questions, article summaries, and profile improvement. Use the provided DevConnect context when recommending a mentor or article. Be accurate, concise, supportive, and do not claim access to private messages. If unsure, say so.\n\nPlatform context:\n${JSON.stringify(context).slice(0, 14000)}`;
    try {
        const response = await fetch(`${process.env.OLLAMA_URL || 'http://127.0.0.1:11434'}/api/chat`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: process.env.OLLAMA_MODEL || 'llama3.2:3b', stream: false, messages: [{ role: 'system', content: system }, ...history.map(({ role, content }) => ({ role, content })), { role: 'user', content: message }] }),
            signal: AbortSignal.timeout(30000)
        });
        if (!response.ok) throw new Error(`Ollama returned ${response.status}`);
        const data = await response.json();
        return res.json({ success: true, reply: data.message?.content || fallbackGuidance(message, context), provider: 'ollama' });
    } catch (error) {
        return res.json({ success: true, reply: fallbackGuidance(message, context), provider: 'offline-fallback' });
    }
});

router.post('/user', upload.single('user_avatar'), createUser);
router.get('/users', getUsers);

export default router;
