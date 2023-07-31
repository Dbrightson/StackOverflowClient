import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_TOKEN;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendOTP = async (user) => {
  try {
    const verification = await client.verify
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: user.phno,
        channel: 'sms',
      });

    console.log('OTP Send Success');
    return true;
  } catch (error) {
    console.log('OTP Send failed', error);
    return false;
  }
};

export default sendOTP;
