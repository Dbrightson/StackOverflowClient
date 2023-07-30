import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import copy from 'copy-to-clipboard'
import { useParams } from 'react-router-dom'
import { deleteAnswer, addReply } from '../../actions/question'
import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar/Avatar'
import moment from 'moment'
import Reply from './Reply'

const Answer = ({ ans, question }) => {
    const [reply, setReply] = useState('')
    const [enableReply, setEnableReply] = useState(false)
    const { id } = useParams()
    const User = useSelector((state) => (state.currentUserReducer))
    // const navigate = useNavigate()
    console.log(ans);
    const dispatch = useDispatch()
    const location = useLocation()
    const url = process.env.REACT_APP_FRONT_END
    const handleShare = () => {
        copy(url + location.pathname)
        alert('URL Copied to clipboard' + url + location.pathname)
    }

    const handleDelete = (answerId, noOfAnswers) => {
        dispatch(deleteAnswer(id, answerId, noOfAnswers - 1))
    }

    const handleReply = () => {
        if (reply.length === 0) return
        console.log(reply);
        dispatch(addReply(id, User?.result?._id, ans._id, reply))
        setEnableReply(!enableReply)
    }
    return (
        <div className='display-ans' key={ans._id}>
            <p>{ans.answerBody}</p>
            <div className='question-actions-user'>
                <div>
                    <button type='button' onClick={handleShare}>Share</button>
                    {
                        User?.result?._id === ans.userId && (
                            <button type='button' onClick={() => handleDelete(ans._id, question.noOfAnswers)}>Delete</button>
                        )
                    }
                </div>
                <div>
                    {!enableReply && <button type='button' onClick={e => setEnableReply(!enableReply)}>Reply</button>}
                    {enableReply && <input type="text" autoFocus onChange={e => setReply(e.target.value)} />}
                    {enableReply && <button type='button'  onClick={handleReply}>Add Reply</button>}
                    {enableReply && <button type='button' onClick={e => setEnableReply(!enableReply)}>Cancel</button>}
                </div>
                <div>
                    <p>Answered {moment(ans.answeredOn).fromNow()}</p>
                    <Link to={`/Users/${ans.userId}`} className='user-link' style={{ color: '#00086d8' }}>
                        <Avatar backgroundColor="green" px="8px" py="5px">{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                        <div>{ans.userAnswered}</div>
                    </Link>
                </div>
            </div>
            <div>
                {ans.replies.map(r => <Reply replies={r} question={question} />)}
            </div>
        </div>
    )
}

export default Answer