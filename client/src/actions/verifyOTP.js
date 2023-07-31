import express from 'express';
import { generateOTP, verifyOTP } from '../controllers/generateOTP';

const router = express.Router();

router.post('/phno', generateOTP);
router.post('/otp', verifyOTP);

export default router;
