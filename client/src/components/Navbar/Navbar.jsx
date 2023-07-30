import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import Avatar from '../../components/Avatar/Avatar'
import search from '../../assets/search-solid.svg'
import './Navbar.css'
import { Button } from '@mui/material';
import {useSelector,useDispatch} from 'react-redux'
import setCurrentUser from '../../actions/currentUser'
import {useNavigate} from 'react-router-dom'
import decode from 'jwt-decode'

const Navbar = () => {

    var User = useSelector((state)=>(state.currentUserReducer))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' })
        navigate('/')
        dispatch(setCurrentUser(null))
    }

    useEffect(() => {
        const token = User?.token
        if (token) {
            const decodeToken = decode(token)
            if (decodeToken.exp * 1000 < new Date().getTime()) {
                handleLogout()
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    return (
        <nav className='main-nav'>
            <div className='navbar'>
                <Link to='/' className='nav-item nav-logo'>
                    <img src={logo} alt="logo" />
                </Link>
                
                <Link to='/' className='nav-item nav-btn'>About</Link>
                
                <Link to='/' className='nav-item nav-btn'>Products</Link>
                
                <Link to='/' className='nav-item nav-btn'>For Teams</Link>
                
                <form action="">
                    <input type="text" name="" id="" placeholder='Search...' />
                    {/* <SearchSharpIcon className='search-icon' fontSize='medium' /> */}
                    <img src={ search } alt="search" width="18" className='search-icon'/>
                </form> 
                {/* <div> */}
                    
                {User === null ?
                    <Link to='/Auth' className='nav-item nav-links'>Log in</Link>
                        :
                        <>
                        <Avatar
                            backgroundColor='#009dff'
                            px='10px' py='5px'
                            borderRadius='50%'
                            color='white'
                        >
                            <Link to={`/Users/${User.result._id}`} style={{color:'white',textDecoration:'none'}}>
                                {User.result.name.charAt(0).toUpperCase()}
                            </Link>
                        </Avatar>
                        <Button onClick={handleLogout}>Log out</Button>
                    </> 
                    }
                    {/* </div> */}
            </div>  
        </nav>
    )
}

export default Navbar