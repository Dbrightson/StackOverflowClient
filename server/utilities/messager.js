import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendOTP = async (user) => {
  try {
    const verification = await client.verify.services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications
      .create({
        to: user.phno,
        channel: 'sms',
      });

    if (verification.status === 'pending') {
      console.log('OTP Send Success');
      return true;
    } else {
      console.log('OTP Send failed');
      return false;
    }
  } catch (error) {
    console.log('Error sending OTP:', error);
    return false;
  }
};

export default sendOTP;
