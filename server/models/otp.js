import mongoose from 'mongoose'

const OTPSchema = mongoose.Schema({
    email: { type: String, required: false },
    phno: { type: String, required: true },
    otp: { type: String, required: true },
    expiresIn: { type: Date, required:true }
})

export default mongoose.model('OTP', OTPSchema) 
