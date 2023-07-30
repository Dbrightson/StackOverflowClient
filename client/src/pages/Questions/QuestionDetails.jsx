import React,{useState} from 'react'
import { useParams,Link } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate,useLocation} from 'react-router-dom'
import {postAnswer,deleteQuestion, voteQuestion} from '../../actions/question'
import moment from 'moment'
import copy from 'copy-to-clipboard'

import upvote from '../../assets/sort-up.svg'
import downvote from '../../assets/sort-down.svg'
import './Questions.css'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswer from './DisplayAnswer'

const QuestionDetails = () => {
    const User = useSelector((state) => (state.currentUserReducer))
    // const users = useSelector((state) => state.usersReducer)
    // console.log(users);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const url = process.env.REACT_APP_FRONT_END
    const [answer, setAnswer] = useState('')
    const { id } = useParams()
    // var questionsList = [{ 
    //     _id: '1',
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 2,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["java", "node js", "react js", "mongo db", "express js"],
    //     userPosted: "mano",
    //     userId: 1,
    //     askedOn: "jan 1",
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: 'kumar',
    //         answeredOn: "jan 2",
    //         userId: 2,
    //     }]
    // },{
    //     _id: '2',
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 0,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["javascript", "R", "python"],
    //     userPosted: "mano",
    //     askedOn: "jan 1",
    //     userId: 1,
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: 'kumar',
    //         answeredOn: "jan 2",
    //         userId: 2,
    //     }]
    // },{
    //     _id: '3',
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 0,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["javascript", "R", "python"],
    //     userPosted: "mano",
    //     askedOn: "jan 1",
    //     userId: 1,
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: 'kumar',
    //         answeredOn: "jan 2",
    //         userId: 2,
    //     }]
    // }]
    const handlePostAnswer = (e,answerLength) => {
        e.preventDefault()
        if (User === null) {
            alert('login or signup to answer a question')
            navigate('/Auth')
        } else {
            if (answer === '') {
                alert('Enter an answer before submitting')
            } else {
                // console.log(User?.result?._id);
                dispatch(postAnswer({id, noOfAnswers: answerLength+1, answerBody: answer, userAnswered: User.result.name,userId: User?.result?._id }))
            }
        }
    }
    const handleShare = () => {
        copy(url + location.pathname)
        alert('URL Copied to clipboard'+url+location.pathname)
    }

    const handleDelete = () => {
        // console.log(id);
        dispatch(deleteQuestion(id,navigate))
    }

    const handleUpVote = () => {
        // console.log('upVoted');
        dispatch(voteQuestion(id,'upVote',User?.result?._id))
    }
    const handleDownVote = () => {
        // console.log('downVoted');
        dispatch(voteQuestion(id,'downVote',User?.result?._id))
        
    }
    const questionsList = useSelector(state => state.questionReducer)
  return (
    <div className='question-details-page'>
        {
            questionsList.data === null ?
                    <h1>Loading...</h1>
                :
                    <>
                        {
                            questionsList.data.filter(question => question._id === id).map(question => (
                                <div key={question._id}>
                                    <section className='question-details-container'>
                                        <h1>{question.questionTitle}</h1>
                                        <div className='question-details-container-2'>
                                            <div className='question-votes'>
                                                <img className='.votes-icon' src={upvote} alt="upvote" width='18' onClick={handleUpVote}/>
                                                <p>{ question.upVote.length - question.downVote.length}</p>
                                                <img className='.votes-icon' src={downvote} alt="downvote" width='18'onClick={handleDownVote}/>
                                            </div>
                                            <div style={{width:'100%'}}>
                                                <p className='question-body'>{question.questionBody}</p>
                                                <div className='question-details-tags'> 
                                                    {
                                                        question.questionTags.map(tag => (
                                                            <p key={tag}>{tag}</p>
                                                        ))    
                                                    }
                                                </div>
                                                <div className='question-actions-user'>
                                                    <div>
                                                        <button type='button' onClick={handleShare}>Share</button>
                                                        {
                                                            User?.result?._id === question?.userId && (
                                                                <button type='button' onClick={handleDelete}>Delete</button>
                                                            )
                                                        }
                                                    </div>
                                                    <div>
                                                        <p>asked {moment(question.askedOn).fromNow()}</p>
                                                        <Link to={`/Users/${question.userId}`} className='user-link' style={{ color: '#00086d8' }}>
                                                            <Avatar backgroundColor="orange" px="8px" py="5px">{ question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                            <div>
                                                                {question.userPosted}
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    {
                                        question.noOfAnswers !== 0 && (
                                            <section>
                                                <h3>{question.noOfAnswers} Answers</h3>
                                                <DisplayAnswer key={question} question={question} />
                                            </section>
                                        )
                                    }
                                    <section className='post-ans-container'>
                                        <h3>Your Answer</h3>
                                        <form action="" onSubmit={(e) => { handlePostAnswer(e,question.answer.length) }}>
                                            <textarea name="" id="" cols="30" rows="10" onChange={(e)=>{setAnswer(e.target.value)}}></textarea>
                                            <input type="submit" className='post-ans-btn' value='Post your Answer' />
                                        </form>
                                        <p>
                                            Browser Other Questions Tagged!
                                            {
                                                question.questionTags.map(tag => (
                                                    <Link to='/Tags' className='ans-tags' key={tag}>{ tag }</Link>
                                                ))
                                            } or {
                                                <Link to='/AskQuestion' style={{ textDecoration:'none',color:'009dff'}}>Ask Your Own Question</Link>
                                            }
                                        </p>
                                    </section>

                                </div>
                            ))
                        }
                    </>
        }
    </div>
    )
}

export default QuestionDetails
