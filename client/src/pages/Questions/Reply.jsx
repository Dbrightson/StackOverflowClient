import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar/Avatar'
const Reply = ({replies,question}) => {
  return (
        <div>
          <p>{replies.reply}</p>
          <div>
          <Link to={`/Users/${question.userId}`} className='user-link' style={{ color: '#00086d8' }}>
              <Avatar backgroundColor="green" px="8px" py="5px">{ replies.userAnswered.charAt(0).toUpperCase()}</Avatar>
              <div>{replies.userAnswered}</div>
          </Link>
      </div>
        </div>
  )
}

export default Reply