import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {updateProfile}  from '../../actions/users'
const EditProfileForm = ({ currentUser, setSwitch }) => {
    const [name, setName] = useState(currentUser?.result?.name)
    const [about, setAbout] = useState(currentUser?.result?.about)
    const [tags, setTags] = useState(currentUser?.result?.tags)
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        setTags(tags.split(' '))
        if (tags.length === 0) {
            dispatch(updateProfile(currentUser?.result._id, { name, about, tags: tags }))
        } else {
            dispatch(updateProfile(currentUser?.result._id, { name, about, tags }))
        }
        setSwitch(false)
    }
  return (
    <div>
        <h1 className='edit-profile-title'> Edit your Profile</h1>
        <h2 className='edit-profile-title-2'>Public Information</h2>
        <form onSubmit={handleSubmit} className="edit-profile-form">
        <label htmlFor="name">
            <h3>Display Name</h3>
            <input type="text" name="" id="name" value={name} onChange={(e)=>setName(e.target.value)} />
        </label>
        <label htmlFor="about">
            <h3>About Me</h3>
            <textarea cols="30" rows="10" name="" id="about" value={about} onChange={(e)=>setAbout(e.target.value)} />
        </label>
        <label htmlFor="ags">
            <h3>Watched Tags</h3>
            <input type="text" name="" id="tags" value={tags} onChange={(e)=>setTags(e.target.value)} />
        </label><br />
        <input type="submit" value="Save Profile" className='user-submit-btn'/><br />
        <button type='button' className='user-cancel-btn' onClick={ ()=> setSwitch(false) }> Cancel </button>
        </form>
    </div>
  )      
}

export default EditProfileForm