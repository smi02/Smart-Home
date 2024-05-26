import express from 'express';
const router = express.Router()
import cors from 'cors';
import { user, registerUser, loginUser, getUser } from '../controllers/AuthController.js';

// middleware
// router.use(
//     cors({
//         credentials: true,
//         origin: 'http://127.0.0.1:5173'
//     })
// )



router.get('/', user)
router.post('/register', registerUser)
router.post('/login', loginUser)
//router.get('/profile', getProfile)
router.get('/:id', getUser)

export default router