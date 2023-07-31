import OTP from '../models/otp';
import * as api from '../api';

export const verifyOTP = async (req, res) => {
  try {
    const user = await OTP.findOne({ phno: req.body.phno });
    if (user) {
      if (req.body.recvOTP === user.otp) {
        return res.status(200).send({ message: true });
      } else {
        return res.status(500).send({ message: false });
      }
    } else {
      return res.status(500).send({ message: 'Retry' });
    }
  } catch (error) {
    return res.status(500).send({ message: 'Retry ' + error.message });
  }
};
