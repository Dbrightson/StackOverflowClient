import React, {useState} from 'react'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import FollowGrid from './FollowGrid'
import PostList from '../Post/PostList'

export default function ProfileTabs ( props ){
  const [tab, setTab] = useState(0)

  const handleTabChange = (event, value) => {
    setTab(value)
  }

    return (
    <div>
        <AppBar position="static" color="default">
          <Tabs
            value={tab}
            onChange={handleTabChange}
            indicatorColor="orange"
            textColor="orange"
            variant="fullWidth"
          >
            <Tab label="Posts" />
            <Tab label="Following" />
            <Tab label="Followers" />
          </Tabs>
        </AppBar>
       {tab === 0 && <TabContainer><PostList removeUpdate={props.removePostUpdate} posts={props.posts}/></TabContainer>}
       {tab === 1 && <TabContainer><FollowGrid people={props.user.following}/></TabContainer>}
       {tab === 2 && <TabContainer><FollowGrid people={props.user.followers}/></TabContainer>}
    </div>)
  
}

ProfileTabs.propTypes = {
  user: PropTypes.object.isRequired,
  removePostUpdate: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
}

const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}
