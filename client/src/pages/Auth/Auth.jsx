import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import icon from '../../assets/icon.png'
import AboutAuth from './AboutAuth'
import {signup,login} from '../../actions/auth'
import './Auth.css'

const Auth = () => {
    const [isSignup, setIsSignup] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSwitch = () => {
        setIsSignup(!isSignup)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!email || !password){
            alert('Enter valid credentials to continue')
        }
        if (isSignup) {
            if (!name) {
                alert('Enter a name to continue')
            }
            dispatch(signup({name,email,password},navigate))
        } else {
            dispatch(login({email, password},navigate))
        }
    }
    return (
        <section className='auth-section'>
            { isSignup && <AboutAuth/>}
            <div className='auth-container-2'>
                {!isSignup && <img src={icon} alt='stack overflow' className='login-logo' />}
                <form onSubmit={handleSubmit}>
                    {
                        isSignup && (
                            <label htmlFor='name'>
                                <h4>Name</h4>
                                <input type="name" name="name" id="name" onChange={e=>{setName(e.target.value)}}/>
                            </label>
                        )
                    }    

                    <label htmlFor='email'>
                        <h4>Email</h4>
                        <input type="email" name="email" id="email" onChange={e=>{setEmail(e.target.value)}}/>
                    </label>
                    <label htmlFor='password'>
                        <div style={{display:'flex', justifyContent:'space-between'}}>
                            <h4 >Password</h4>
                            { !isSignup && <p style={{color:'#007ac6',fontSize:'13px'}}>Forgot Password?</p>}
                        </div>
                        <input type="password" name="password" id="password" onChange={e=>{setPassword(e.target.value)}}/>
                        {
                            isSignup &&
                                <p style={{color:'#666767',fontSize:'13px'}}>
                                    Passwords must contain atleast eight characters <br />
                                    including atleast 1 letter and <br />
                                    1 number <br />
                                </p>
                        }
                    </label>
                    {
                        isSignup && (
                            <label htmlFor='check'>
                                <input type="checkbox" name="check" id="check" />
                                <p style={{fontSize:'13px'}}>Opt-in to receive occasional product updates,<br />
                                   user research invitations, company announcements, and digests.</p>
                            </label>
                        )
                    }    

                    <button type="submit" className='auth-btn'>{isSignup ? 'Sign up' : 'Log in'}</button>
                    {
                        isSignup && (
                            <label htmlFor=''>
                                <p style={{color:'#666767',fontSize:'13px'}}>By clicking “Sign up”, <br /> you agree to our <span style={{color:'#007ac6'}}> terms of service </span>,<br />
                                <span style={{color:'#007ac6'}}>privacy policy</span> and <span style={{color:'#007ac6'}}>cookie policy</span></p>
                            </label>
                        )
                    }    
                </form>
                <p>
                    {isSignup ? 'already have an account?' : 'Don\'t have an account? '}
                    <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{ isSignup ? 'Log in':'Sign up' }</button>
                </p>
            </div>
        </section>
      )
}

export default Auth