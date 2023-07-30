/* eslint-disable no-unused-vars */
import * as api from '../api'

export const askQuestion = (questionData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.postQuestion(questionData)
        console.log(data);
        dispatch({ type: "POST_QUESTION", payload: data })
        dispatch(fetchAllQuestions())
        navigate('/')
    } catch (error) {
        console.log('src actions question askQuestion',error)
    }
    
}

export const fetchAllQuestions = () => async(dispatch) =>{
    try {
        const { data } = await api.getAllQuestions()
        dispatch({type: 'FETCH_ALL_QUESTIONS',payload:data})
    } catch (error) {
        console.log('src actions question fetchAllQuestions',error)
        
    }
}

export const postAnswer = (answerData) => async (dispatch) => {
    try {
        const { id, noOfAnswers, answerBody, userAnswered,userId } = answerData
        const {data} = await api.postAnswer(id, noOfAnswers, answerBody, userAnswered,userId)
        dispatch({ type: 'POST_ANSWER', payload: data })
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log('src actions question postAnswer',error)
    }
} 

export const deleteQuestion = (id, navigate) => async (dispatch) => {
    try {
        const {data} = api.deleteQuestion(id)
        dispatch(fetchAllQuestions())
        navigate('/')
    } catch (error) {
        console.log('src actions question deleteQuestion',error)
    }
}

export const deleteAnswer = (id,answerId,noOfAnswers) => async (dispatch) => {
    try {
        const {data} = api.deleteAnswer(id,answerId,noOfAnswers)
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log('src actions question deleteAnswer', error)
    }
}

export const addReply = (id,userId,answerId,reply) => async (dispatch) => {
    try {
        const {data} = api.addReply(id,userId,answerId,reply)
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log('src actions question addReply', error)
    }
}

export const voteQuestion = (id, value, userId) => async (dispatch) => {
    try {
        const { data } = api.voteQuestion(id, value, userId)
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log('src actions question voteQuestion',error)
    }
}