import mongoose from 'mongoose'
import Questions from '../models/Questions'
import User from '../models/auth'

export const postAnswer = async (req, res) => {
    // const { id: _id } = req.params
    const _id = req.params.id.substring(1,req.params.id.length)
    // .id.substring(1,req.params.id.length)
    // console.log(_id);
    const {noOfAnswers, answerBody, userAnswered, userId} = req.body
    // console.log('ctrl answers postAnswer',req.body)
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable')
    }
    updateNoOfQuestions( _id, noOfAnswers)
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(_id, { $addToSet: { 'answer': [{ answerBody, userAnswered, userId }] } })
        res.status(200).send(updatedQuestion)
    } catch (error) {
        res.status(404).send('controllers answers postAnswer',error)
    }
}

const updateNoOfQuestions = async (_id, noOfAnswers) => {
    try {
        await Questions.findByIdAndUpdate(_id, {$set: {'noOfAnswers':noOfAnswers}})    
    } catch (error) {
        console.log('controllers answers updateNoOfQuestions',error)
    }
}

export const deleteAnswer = async (req,res) => {
    const _id = req.params.id.substring(1,req.params.id.length)
    const { answerId, noOfAnswers } = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable')
    }
    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send('answer unavailable')
    }
    updateNoOfQuestions(_id, noOfAnswers)
    try {
        await Questions.updateOne(
            { _id },
            { $pull:{'answer':{_id: answerId}}}
        )
        res.status(200).send({message:'answer successfully deleted'})
    } catch (error) {
        
    }
}

export const addReply = async (req,res) => {
    const _id = req.params.id.substring(1,req.params.id.length)
    const { userId, answerId, reply } = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable')
    }
    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send('answer unavailable')
    }
    try {
        const user = await User.findById(userId)
        const question = await Questions.findById(_id)
        var userAnswered = ''
        for (const answer of question.answer) {
            if (answer['_id'] == answerId) {
                userAnswered = answer["userId"]
                answer['replies'].push({userId:userId,userAnswered:user.name,reply:reply})
            }
        }
        await Questions.updateOne(
            { _id },
            { $set:{'answer':question.answer}}
        )
        res.status(200).send({message:'reply added successfully'})
        } catch (error) {
            res.status(500).send({message:error+'reply failed to add'})
        }
}