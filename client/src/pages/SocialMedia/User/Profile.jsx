import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction' 
import ListItemText from '@mui/material/ListItemText' 
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Edit from '@mui/icons-material//Edit'
import Divider from '@mui/material/Divider'
import DeleteUser from './DeleteUser'
import auth from './../../../api/auth-helper'
import {read} from './../../../api/api-user.js'
import {useNavigate, Link, useParams} from 'react-router-dom'
import FollowProfileButton from './FollowProfileButton'
import ProfileTabs from './ProfileTabs'
import {listByUser} from './../../../api/api-post.js'
import { orange } from '@mui/material/colors'


export default function Profile() {
  const [values, setValues] = useState({
    user: {following:[], followers:[]},
    redirectToSignin: false,
    following: false
  })
  const {userId} = useParams();

  const [posts, setPosts] = useState([])
  const jwt = auth.isAuthenticated()
  const navigate = useNavigate()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
  
    const checkFollow = (user) => {
      const match = user.followers.some((follower)=> {
        return follower._id === jwt.user._id
      })
      return match
    }
    const loadPosts = (user) => {
      listByUser({
        userId: user
      }, {
        t: jwt.token
      }).then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setPosts(data)
        }
      })
    }
    read({
      userId: userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setValues({...values, redirectToSignin: true})
      } else {
        let following = checkFollow(data)
        setValues({...values, user: data, following: following})
        loadPosts(data._id)
      }
    })
    return function cleanup(){
      abortController.abort()
    }

  }, [jwt.token, jwt.user._id, userId, values])
  
  const clickFollowButton = (callApi) => {
    callApi({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, values.user._id).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, user: data, following: !values.following})
      }
    })
  }
  const removePost = (post) => {
    const updatedPosts = posts
    const index = updatedPosts.indexOf(post)
    updatedPosts.splice(index, 1)
    setPosts(updatedPosts)
  }

    const photoUrl = values.user._id
              ? process.env.REACT_APP_NODE_JS+`users/photo/${values.user._id}?${new Date().getTime()}`
              : process.env.REACT_APP_NODE_JS+'users/defaultphoto'
    if (values.redirectToSignin) {
      return navigate('/Auth')
    }
    return (
      <Paper styles={{
        maxWidth: 600,
        margin: 'auto',
        padding: '50px 10px',
        marginTop: '5px'
      }} elevation={4}>
        <Typography variant="h6" styles={{
    margin: `2px 1px 0`,
    color:orange['700'],
    fontSize: '1em'
  }}>
          Profile
        </Typography>
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={photoUrl} styles={{
    width: 60,
    height: 60,
    margin: 10
  }}/>
            </ListItemAvatar>
            <ListItemText primary={values.user.name} secondary={values.user.email}/> {
             auth.isAuthenticated().user && auth.isAuthenticated().user._id === values.user._id
             ? (<ListItemSecondaryAction>
                  <Link to={"/SocialMedia/User/edit/" + values.user._id}>
                    <IconButton aria-label="Edit" color="orange">
                      <Edit/>
                    </IconButton>
                  </Link>
                  <DeleteUser userId={values.user._id}/>
                </ListItemSecondaryAction>)
            : (<FollowProfileButton following={values.following} onButtonClick={clickFollowButton}/>)
            }
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText primary={values.user.about} secondary={"Joined: " + (
              new Date(values.user.created)).toDateString()}/>
          </ListItem>
        </List>
        <ProfileTabs user={values.user} posts={posts} removePostUpdate={removePost}/>
      </Paper>
    )
}


