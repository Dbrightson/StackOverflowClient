import OTP from '../models/otp';
import User from '../models/auth';
import sendOTP from '../utilities/messager';

export const generateOTP = async (req, res) => {
  try {
    const user = await User.findOne({ phno: req.body.phno });
    if (user) {
      console.log('server ctrl genOTP');
      if (!await OTP.findOne({ phno: req.body.phno })) {
        const otp = new OTP({
          phno: req.body.phno,
          otp: (Math.floor((Math.random() * 10000) + 1)).toString(),
          expiresIn: new Date().getTime() + 300 * 1000,
        });
        await otp.save();
      } else {
        const otp = await OTP.findOneAndUpdate({ phno: req.body.phno }, {
          otp: Math.floor((Math.random() * 10000) + 1),
          expiresIn: new Date().getTime() + 300 * 1000,
        }, { returnDocument: 'after' });
      }
      const otpStatus = await sendOTP(otp);
      if (otpStatus) {
        return res.status(200).send({ message: 'OTP Sent Successfully' });
      } else {
        return res.status(500).send({ message: 'Sending OTP failed' });
      }
    } else {
      return res.status(500).send({ message: 'User Not Found, Please register' });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
