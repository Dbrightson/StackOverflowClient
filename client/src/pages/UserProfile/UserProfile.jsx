import React,{useState} from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Avatar from '../../components/Avatar/Avatar'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import ProfileBio from './ProfileBio'
import EditProfileForm from './EditProfileForm'
import './UserProfile.css'

const UserProfile = () => {
    const {id}  = useParams()
    const users = useSelector((state) => state.usersReducer)
    const currentProfile = users.filter((user)=>user._id === id)[0]
    const currentUser = useSelector( (state) => state.currentUserReducer)

    const [ Switch, setSwitch] = useState(false)

    const handleSwitch = () => {
        setSwitch(!Switch)
    }
    return (
        <div className='home-container-1'>
            <LeftSidebar/>
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className="user-details">
                            <Avatar
                                backgroundColor='purple'
                                fontSize='50px'
                                px='40px'
                                py='30px'
                            >
                                {currentProfile?.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <p><FontAwesomeIcon icon={faBirthdayCake} />
                                Joined { moment(currentProfile?.joinedOn).fromNow()}
                                </p>
                            </div>
                        </div>  
                        {
                            currentUser?.result._id === id && (
                                <button type='button' onClick={handleSwitch} className='edit-profile-btn'>
                                    <FontAwesomeIcon icon={faPen}/> Edit Profile
                                </button>
                            )
                        }
                    </div>
                    <>
                    {
                        Switch ? (
                            <EditProfileForm currentUser={currentUser} setSwitch={setSwitch}/>
                        ) : (
                            <ProfileBio currentProfile={currentProfile}/>
                        )
                    }
                    </>
                </section>  
            </div>
        </div>
  )
}

export default UserProfile