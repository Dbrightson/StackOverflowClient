import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Person from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { list } from "../../../api/api-user";
import { teal } from "@mui/material/colors";
import LeftSidebar from "../../../components/LeftSidebar/LeftSidebar";

export default function SMUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div className="Smhome-container-1">
      <LeftSidebar />
      <div className="Smhome-container-2">
        <Paper
          styles={{
            padding: "50px 10px",
            margin: "15px",
          }}
          elevation={4}
        >
          <Typography
            variant="h6"
            styles={{
              margin: "4px 0 2px",
              color: teal["700"],
            }}
          >
            All Users
          </Typography>
          <List dense>
            {users.map((item, i) => {
              return (
                <Link to={"/SocialMedia/User/" + item._id} key={i}>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.name} />
                    <ListItemSecondaryAction>
                      <IconButton>
                        <ArrowForward />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Paper>
      </div>
    </div>
  );
}
