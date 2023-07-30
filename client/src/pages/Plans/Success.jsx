import React from 'react'
const Success = () => {
  localStorage.removeItem('Profile')
  return (
    <div><br /> <br /><br />Success <a href='/Auth'>LogIn Again Please</a></div>
  )
}

export default Success