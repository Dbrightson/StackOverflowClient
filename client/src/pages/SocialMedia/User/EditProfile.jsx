import React, {useEffect, useState} from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'
import Avatar from '@mui/material/Avatar'
import FileUpload from '@mui/icons-material//AddPhotoAlternate'
import auth from './../../../api/auth-helper'
import {read, update} from './../../../api/api-user.js'
import {useNavigate, useParams} from 'react-router-dom'
import { orange } from '@mui/material/colors'


export default function EditProfile() {
  const [values, setValues] = useState({
    name: '',
    about: '',
    photo: '',
    email: '',
    password: '',
    redirectToProfile: false,
    error: '',
    id: ''
  })
  const jwt = auth.isAuthenticated()
  const {userId} = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({
      userId: userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data & data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, id: data._id, name: data.name, email: data.email, about: data.about})
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [jwt.token, userId, values])
  
  const clickSubmit = () => {
    let userData = new FormData()
    values.name && userData.append('name', values.name)
    values.email && userData.append('email', values.email)
    values.passoword && userData.append('passoword', values.passoword)
    values.about && userData.append('about', values.about)
    values.photo && userData.append('photo', values.photo)
    update({
      userId: userId
    }, {
      t: jwt.token
    }, userData).then((data) => {
      if (data && data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, 'redirectToProfile': true})
      }
    })
  }
  const handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    //userData.set(name, value)
    setValues({...values, [name]: value })
  }
    const photoUrl = values.id
                 ? `${process.env.REACT_APP_NODE_JS}+users/photo/${values.id}?${new Date().getTime()}`
                 : process.env.REACT_APP_NODE_JS+'users/defaultphoto'
    if (values.redirectToProfile) {
      return (navigate('/SocialMedia/User/' + values.id))
    }
    return (
      <Card styles={{
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: '5px',
        paddingBottom: '2px'
      }}>
        <CardContent>
          <Typography variant="h6" styles={{
    margin: '2px',
    color: orange['700']
  }}>
            Edit Profile
          </Typography>
          <Avatar src={photoUrl} styles={{
    width: 60,
    height: 60,
    margin: 'auto'
  }}/><br/>
          <input accept="image/*" onChange={handleChange('photo')} styles={{
    display: 'none'
  }} id="icon-button-file" type="file" />
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="default" component="span">
              Upload
              <FileUpload/>
            </Button>
          </label> <span styles={{
    marginLeft:'10px'
  }}>{values.photo ? values.photo.name : ''}</span><br/>
          <TextField id="name" label="Name" styles={{
    marginLeft: '1px',
    marginRight: '1px',
    width: 300
  }} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
          <TextField
            id="multiline-flexible"
            label="About"
            multiline
            rows="2"
            value={values.about}
            onChange={handleChange('about')}
            styles={{
              marginLeft: '1px',
              marginRight: '1px',
              width: 300
            }}
            margin="normal"
          /><br/>
          <TextField id="email" type="email" label="Email" styles={{
    marginLeft: '1px',
    marginRight: '1px',
    width: 300
  }} value={values.email} onChange={handleChange('email')} margin="normal"/><br/>
          <TextField id="password" type="password" label="Password" styles={{
    marginLeft: '1px',
    marginRight: '1px',
    width: 300
  }} value={values.password} onChange={handleChange('password')} margin="normal"/>
          <br/> {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" styles={{
    verticalAlign: 'middle'
  }}>error</Icon>
              {values.error}
            </Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="orange" variant="contained" onClick={clickSubmit} styles={{
    margin: 'auto',
    marginBottom: '2px'
  }}>Submit</Button>
        </CardActions>
      </Card>
    )
}
