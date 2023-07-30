import React from 'react'
import Answer from './Answer'

const DisplayAnswer = ({question}) => {
    return (
    <div>
        {
            question.answer.map(ans => (
                <Answer ans={ ans } question={ question } />
            ))
        }   
    </div>
  )
}

export default DisplayAnswer