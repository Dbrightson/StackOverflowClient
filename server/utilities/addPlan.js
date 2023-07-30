import User from '../models/auth'

export const addPlan = async (id, plan) => {
    try {
        var noOfQuestions = 1
        if (plan === 'Silver') {
            noOfQuestions = 5
        } else if(plan === 'Gold') {
            noOfQuestions = Infinity
        }
        await User.findByIdAndUpdate(id, { planOpted: plan, planOptedOn: Date.now(), noOfQuestions: noOfQuestions })
        return 
        
    } catch (error) {
        console.log('serv utils addPlan addPlan', error);
        return 
    }
}