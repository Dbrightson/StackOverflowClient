import OTP from '../models/otp'
import User from '../models/auth'
import sendOTP from '../utilities/messager';

export const generateOTP = async (req, res) => {
    try {
        var user = await User.findOne({ phno: req.body.phno });
        if (user) {
            console.log('server ctrl genOTP');
            let otp;
            if (!await OTP.findOne({ phno: req.body.phno })) {
                otp = new OTP({
                    phno: req.body.phno,
                    otp: (Math.floor(Math.random() * 10000) + 1).toString(),
                    expiresIn: new Date().getTime() + 300 * 1000,
                });
                await otp.save();
            } else {
                otp = await OTP.findOneAndUpdate(
                    { phno: req.body.phno },
                    {
                        otp: Math.floor(Math.random() * 10000) + 1,
                        expiresIn: new Date().getTime() + 300 * 1000,
                    },
                    { returnDocument: 'after' }
                );
            }
            const otpStatus = await sendOTP(otp); // Await the sendOTP function
            if (otpStatus) {
                return res.status(200).send({ message: 'Mail Sent Successfully' });
            } else {
                return res.status(500).send({ message: 'Sending Mail failed' });
            }
        } else {
            return res.status(500).send({ message: 'User Not Found, Please register' });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message || 'Internal Server Error' });
    }
};

export const verifyOTP = async (req, res) => {
    try {
		var user = await OTP.findOne({ phno: req.body.phno })
		if (user) {
			if(req.body.recvOTP === user.otp){
				return res.status(200).send({message:true})
			}
			else{
				return res.status(500).send({message:false})
			}
		}else {
			return res.status(500).send({message:'Retry'})
		}
    } catch (error) {
    	return res.status(500).send({message:'Retry'+error})
    }
}
