import twilio from 'twilio';
import dotenv from 'dotenv';
import express from 'express';

const router = express.Router();
dotenv.config();

const client = twilio(
  process.env.TWILIO_TOKEN,
  process.env.TWILIO_PASSWORD
);

router.post('/verify/phno', (req, res) => {
  const { phoneNumber, otp } = req.body;

  client.verify
    .services(process.env.TWILI0_SERVICE)
    .verificationChecks.create({
      to: phoneNumber,
      code: otp,
    })
    .then((verificationCheck) => {
      if (verificationCheck.status === 'approved') {
        return res.status(200).send({ message: true });
      } else {
        return res.status(500).send({ message: 'Invalid OTP' });
      }
    })
    .catch((error) => {
      return res.status(500).send({ message: 'Retry' });
    });
});

export default router;
