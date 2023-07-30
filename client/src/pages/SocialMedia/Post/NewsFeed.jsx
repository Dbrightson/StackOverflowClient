/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import auth from '../../../api/auth-helper'
import {listNewsFeed} from '../../../api/api-post'

import PostList from './PostList'
import NewPost from './NewPost'

const NewsFeed = () => {
    const [posts, setPosts] = useState([])
    const jwt = auth.isAuthenticated()
  
    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
  
      listNewsFeed({
        userId: jwt.user._id
      }, {
        t: jwt.token
      }, signal).then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setPosts(data)
        }
      })
      return function cleanup(){
        abortController.abort()
      }
  
    }, [])
  
    const addPost = (post) => {
      const updatedPosts = [...posts]
      updatedPosts.unshift(post)
      setPosts(updatedPosts)
    }
    const removePost = (post) => {
      const updatedPosts = [...posts]
      const index = updatedPosts.indexOf(post)
      updatedPosts.splice(index, 1)
      setPosts(updatedPosts)
    }
  return (
    <Card sx={{
      width: '100%',
    }}>
    <Typography type="title" variant='h5' align='center' color={'black'} sx={{backgroundColor:'rgb(255, 153, 0)'}}>
      Feed
    </Typography>
    <Divider/> 
    <NewPost addUpdate={addPost}/>
    <Divider/>
    <PostList removeUpdate={removePost} posts={posts}/>
  </Card>
  )
}

export default NewsFeed