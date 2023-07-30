import React, { useState, useRef, useEffect } from 'react'
// import  { styles } from './styles.js'
import AvatarChatbot from './AvatarChatbot'
import SupportWindow from './SupportWindow.jsx'

const Chatbot = () => {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    const [botAcitvated, setActivated] = useState(false)
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setVisible(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown',handleClickOutside)
        } 
    }, [ref, visible])
  return (
      !botAcitvated && <div ref={ref}>
          <SupportWindow
              visible={visible}
              botAct={setActivated}
          />
          <AvatarChatbot
              onClick={ ()=> setVisible(!visible) }
              style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px'
            }}
          />
      </div>
  )
}

export default Chatbot