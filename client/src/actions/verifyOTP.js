import * as api from '../api';

export const generateOTP = async (phno) => {
  try {
    return await (await api.generateOTP(phno)).data.message;
  } catch (error) {
    console.log('Error in generateOTP:', error);
  }
};

export const verifyOTP = async (phno, recvOTP) => {
  try {
    return await (await api.verifyOTP(phno, recvOTP)).data.message;
  } catch (error) {
    console.log('Error in verifyOTP:', error);
  }
};
