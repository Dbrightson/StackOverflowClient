import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js';
import questionRoutes from './routes/Questions.js';
import answerRoutes from './routes/Answers.js';
import verificationRoutes from './routes/verification.js'; // New route for OTP verification
import bodyParser from 'body-parser';
import twilio from 'twilio';

const app = express();
dotenv.config();
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors({
  origin: process.env.BACKEND_LINK
}));

app.get('/', (req, res) => {
  res.send('This is a stack overflow clone API');
});

app.use('/user', userRoutes);
app.use('/questions', questionRoutes);
app.use('/answer', answerRoutes);
app.use('/verify', verificationRoutes); // New route for OTP verification
app.use('/search',searchStackOverflow)
app.use('/payment', paymentRoutes);
app.use('/plans', plans)
app.use('/posts',postRoutes)
 
const PORT = process.env.PORT || 5000

cron.schedule('* 38 0 * * *', () => {
    console.log('Updating Plans', Date.now());
    updatePlans()
});
const DATABASE_URL = process.env.CONNECTION_URL || config.mongoUri
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => { console.log(`Server fired up on ${PORT} ${process.env.CONNECTION_URL|| config.mongoUri }`) }))
    .catch(err => console.log(err.message))
