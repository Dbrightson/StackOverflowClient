import React, { useState } from 'react'
import { styles } from './styles.js'
import EmailForm from './OTPVerification/EmailForm.jsx'
import './Chat.css'
const SupportWindow = props => {
  const [isverified, setIsverified] = useState(false)
  const loadKommunicateWidget = () => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: '18d99dd645b6bed5ec46d16752340e654',
        popupWidget: true,
        automaticChatOpenOnNavigation: true
      };
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://widget.kommunicate.io/v2/kommunicate.app';
      var h = document.getElementsByTagName('head')[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  };
  return (
      <div
          className='transition-5'
          style={{
            ...styles.supportWindow,
            ...{display: props.visible ? '':'none'}
          }}
    >
    { !isverified ? 
      <EmailForm  
      visible={!isverified}
          setIsverified={() => { setIsverified(true); loadKommunicateWidget(); props.botAct(true)}}
      /> : 
      <div className="chat-container">
        <div id="kommunicate-widget"></div>
      </div>
    }
    </div>
  )
}

export default SupportWindow