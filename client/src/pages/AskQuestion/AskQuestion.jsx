import React,{useState} from 'react'
import './AskQuestion.css'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { askQuestion } from '../../actions/question'

const AskQuestion = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const User = useSelector((state) => (state.currentUserReducer))
    const [questionTitle,setQuestionTitle ] = useState('')
    const [questionBody, setQuestionBody ] = useState('')
    const [questionTags, setQuestionTags] = useState('')
    // const [noOfQuestions, setNoOfQuestions] = useState(User.result.noOfQuestions)
    // useEffect(() => {
    //     const getNoOfQuestions = async() => {
    //         const { res: data } = await axios.post(process.env.REACT_APP_NODE_JS+'plans/getNoOfQuestions')
    //         console.log(data);
    //         setNoOfQuestions(data.noOfQuestions)
    //     }
    //     getNoOfQuestions()
    // }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(askQuestion({questionTitle,questionBody,questionTags,userPosted: User.result.name, userId: User.result._id }, navigate))
    }
    const handleEnter = (e) => {
        if (e.key === 'Enter')
            setQuestionBody(questionBody+'\n')
    }
    return (
        <div className='ask-question'>
            <div className='ask-ques-container'>
                <h1>Ask a public Question</h1>
                <form action="" onSubmit={ handleSubmit }>
                    <div className='ask-form-container'>
                        <label htmlFor="ask-ques-title">
                            <h4>Title</h4>
                            <p> Be specific and imagine you’re asking a question to another person.</p>
                            <input type="text" name="ask-ques-title" id="ask-ques-title" placeholder='title' onChange={e=>setQuestionTitle(e.target.value)}/>
                        </label>
                        <label htmlFor="ask-ques-body">
                            <h4>Body</h4>
                            <p> Introduce the problem and expand on what you put in the title. Minimum 20 characters.</p>
                            <textarea
                                name="ask-ques-body"
                                id="ask-ques-body"
                                cols="" rows="10"
                                onChange={e => setQuestionBody(e.target.value)}
                                onKeyDown={handleEnter}
                            ></textarea>
                        </label>
                        <label htmlFor="ask-ques-tags">
                            <h4>Tags</h4>
                            <p> Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</p>
                            <input type="text" name="ask-ques-tags" id="ask-ques-tags" placeholder='tags' onChange={e=>setQuestionTags(e.target.value.split(' '))}/>
                        </label>
                    </div>
                    {/* <p>You have { noOfQuestions } question(s) remaining for today</p> */}
                    <input className='review-btn' type="submit" value="Post your question" />
                </form>
            </div>
        </div>
    )
}

export default AskQuestion