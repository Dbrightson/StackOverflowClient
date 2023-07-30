import Questions from '../models/Questions'
import mongoose from 'mongoose'
import User from '../models/auth'
export const AskQuestion = async (req, res) => {
    const postQuestionData = req.body
    const { noOfQuestions, planOpted } = await User.findById(postQuestionData.userId)

    try {
        if (noOfQuestions > 0){
            await new Questions(postQuestionData).save()
            await User.findByIdAndUpdate(postQuestionData.userId,{$inc:{noOfQuestions:-1}})
            res.status(200).send("posted a question successfully")
        } else {
            res.status(409).send("Per Day Question Limit reached")
        }
    } catch (error) {
        console.log('question.js controllers',error);
        res.status(409).send("Couldn't post a question")
    }
}

export const getAllQuestions = async (req, res) => {
    try {
        const questionList = await Questions.find()    
        res.status(200).send(questionList)
    } catch (error) {
        console.log('controllers questions.js getAllQuestions',error);
    }
}

export const deleteQuestion = async (req, res) => {
    const _id = req.params.id.substring(1,req.params.id.length)
    
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable')
    }
    
    try {
        await Questions.findByIdAndRemove(_id)
        return res.status(404).send('successfully question removed')
    } catch (error) {
        res.status(404).send({message:error.message})
    }
}

export const voteQuestion = async (req, res) => {
    const _id = req.params.id
    const { value, userId } = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable')
    }
    try {
        const question = await Questions.findById(_id)
        const upIndex = question.upVote.findIndex(id => id === String(userId))
        const downIndex = question.downVote.findIndex(id=> id === String(userId))
        
        if(value === 'upVote'){
            if (downIndex !== -1){
                question.downVote = question.downVote.filter( id => id !== String(userId))
            }
            if (upIndex === -1){
                question.upVote.push(userId)
            } else {
                question.upVote = question.upVote.filter( id => id !== String(userId))
            }
        }
        else if (value === 'downVote') {
            if (upIndex !== -1){
                question.upVote = question.upVote.filter( id => id !== String(userId))
            }
            if (downIndex === -1){
                question.downVote.push(userId)
            } else {
                question.downVote = question.downVote.filter( id => id !== String(userId))
            }
        }
        await Questions.findByIdAndUpdate(_id, question)
    } catch (error) {
        console.log('controllers questions.js voteQuestion',error);
    }
}