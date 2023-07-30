import User from '../models/auth'

export default async function updatePlans() {
    try {
        const msPerDay = 24 * 60 * 60 * 1000
        const Users = await User.find({})
        for (let index = 0; index < Users.length; index++) {
            const user = Users[index];
            if (user.planOpted === 'Silver') {
                const daysLeft = (new Date().getTime() - new Date(user.planOptedOn).getTime()) / msPerDay
                if (daysLeft >= 30) {
                    await User.findByIdAndUpdate(user._id, { planOpted: 'Free',noOfQuestions: 1 })
                }
                if (user.noOfQuestions === 5) {
                    continue;
                } else {
                    return await User.findByIdAndUpdate(user._id, { noOfQuestions: 5 })
                }
            } else if (user.planOpted === 'Free') {
                if (user.noOfQuestions === 1) {
                    continue;
                } else {
                    return await User.findByIdAndUpdate(user._id, { noOfQuestions: 1 })
                }
            } else if (user.planOpted === 'Gold') {
                const daysLeft = (new Date().getTime() - new Date(user.planOptedOn).getTime()) / msPerDay
                if (daysLeft >= 365) {
                    await User.findByIdAndUpdate(user._id, { planOpted: 'Free',noOfQuestions: 1 })
                }
            }
        }
    } catch (error) {
        console.log('serv utils updatePlans updatePlans', error);
        return res.status(500).json({error})
    }
}