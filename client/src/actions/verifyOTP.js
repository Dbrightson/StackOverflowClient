import * as api from '../api'

export const generateOTP = async(phno) =>{
    try {
        return await (await api.generateOTP(phno)).data.message
    } catch (error) {
        console.log('src actions verifyOTP generateOTP',error)
    }
}

export const verifyOTP = async (phno,recvOTP) => {
    try {
        return await (await api.verifyOTP(phno,recvOTP)).data.message
    } catch (error) {
        console.log('src actions verifyOTP verifyOTP',error)
    }
}
