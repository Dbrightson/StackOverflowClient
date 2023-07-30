/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { findPeople, follow } from "./../../../api/api-user";
import auth from "./../../../api/auth-helper";
import Snackbar from "@mui/material/Snackbar";
import { orange, teal } from "@mui/material/colors";
  
export default function FindPeople() {
  const [values, setValues] = useState({
    users: [],
    open: false,
    followMessage: "",
  });
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    findPeople(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      signal
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, users: data });
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);
  const clickFollow = (user, index) => {
    follow(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      user._id
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        let toFollow = values.users;
        toFollow.splice(index, 1);
        setValues({
          ...values,
          users: toFollow,
          open: true,
          followMessage: `Following ${user.name}!`,
        });
      }
    });
  };
  const handleRequestClose = (event, reason) => {
    setValues({ ...values, open: false });
  };
  return (
    <div>
      <Paper
        styles={{
          padding: "1px",
          margin: 0,
        }}
        elevation={4}
      >
        <Typography
          type="title"
          styles={{
            margin: "1px 1px 1px 1px",
            color: teal["700"],
            fontSize: "1em",
          }}
        >
          Who to follow
        </Typography>
        <List>
          {values.users.map((item, i) => {
            return (
              <span key={i}>
                <ListItem>
                  <ListItemAvatar
                    styles={{
                      marginRight: "1px",
                    }}
                  >
                <Avatar
                  backgroundColor='#009dff'
                  px='10px' py='5px'
                  borderRadius='50%'
                  color='white'
                  sx={{padding:'5px',margin:'5px'}}
                >
                  <Link to={`/Users/${item._id}`} style={{ color: 'white', textDecoration: 'none' }}>
                    {item.name.charAt(0).toUpperCase()}
                  </Link>
                </Avatar> 
                  </ListItemAvatar>
                  <ListItemText primary={item.name} />
                  <ListItemSecondaryAction
                    styles={{
                      right: "1px",
                    }}
                  >
                    <Button
                      aria-label="Follow"
                      variant="contained"
                      color="orange"
                      onClick={() => {
                        clickFollow(item, i);
                      }}
                    >
                      Follow
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </span>
            );
          })}
        </List>
      </Paper>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={values.open}
        onClose={handleRequestClose}
        autoHideDuration={6000}
        message={
          <span
            styles={{
              color: orange["700"],
            }}
          >
            {values.followMessage}
          </span>
        }
      />
    </div>
  );
}
