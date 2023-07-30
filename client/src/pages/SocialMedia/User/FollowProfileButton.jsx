import React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import {unfollow, follow} from './../../../api/api-user.js'

export default function FollowProfileButton (props) {
  const followClick = () => {
    props.onButtonClick(follow)
  }
  const unfollowClick = () => {
    props.onButtonClick(unfollow)
  }
    return (<div>
      { props.following
        ? (<Button variant="contained" color="secondary" onClick={unfollowClick}>Unfollow</Button>)
        : (<Button variant="contained" color="orange" onClick={followClick}>Follow</Button>)
      }
    </div>)
}
FollowProfileButton.propTypes = {
  following: PropTypes.bool.isRequired,
  onButtonClick: PropTypes.func.isRequired
}
