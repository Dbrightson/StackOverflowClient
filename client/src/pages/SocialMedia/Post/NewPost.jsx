/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import auth from "../../../api/auth-helper";
import { create } from "../../../api/api-post";
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const NewPost = (props) => {
  const [values, setValues] = useState({
    text: "",
    photo: "",
    error: "",
    user: {},
  });
  const jwt = auth.isAuthenticated();
  useEffect(() => {
    setValues({ ...values, user: auth.isAuthenticated().user });
  }, []);
  const clickPost = () => {
    let postData = new FormData();
    postData.append("text", values.text);
    postData.append("photo", values.photo);
    create(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      postData
    ).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, text: "", photo: "" });
        props.addUpdate(data);
      }
    });
  };
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };
  // const photoURL = values.user._id
  //   ? process.env.REACT_APP_NODE_JS + "posts/photo/" + values.user._id
  //   : process.env.REACT_APP_NODE_JS + "posts/defaultPhoto/";
  var User = useSelector((state) => (state.currentUserReducer))

  return (
    <div
      styles={{
        backgroundColor: "#efefef",
        padding: "3px 0px 1px",
      }}
    >
      <Card
        style={{
          maxWidth: 600,
          margin: "auto",
          marginBottom: "3px",
          boxShadow: "none",
        }}
      >
        <div style={{
          marginTop: '5px',
          border: '1px solid orange',
          borderRadius: '10% / 100%',
          display:'flex'
        }}>
          <Avatar
            backgroundColor='#009dff'
            px='10px' py='5px'
            borderRadius='50%'
            color='white'
            sx={{padding:'5px',margin:'5px'}}
          >
            <Link to={`/Users/${User.result._id}`} style={{ color: 'white', textDecoration: 'none' }}>
              {User.result.name.charAt(0).toUpperCase()}
            </Link>
          </Avatar>
          <CardHeader
            title={values.user.name}
            style={{
              paddingTop: 8,
              paddingBottom: 8,
            }}
          />
        </div>
        <CardContent
          style={{
            backgroundColor: "white",
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          <TextField
            placeholder="Share your thoughts ..."
            multiline
            rows="3"
            value={values.text}
            onChange={handleChange("text")}
            style={{
              marginLeft: "2px",
              marginRight: "2px",
              width: "100%",
            }}
            margin="normal"
            inputProps={{ maxLength: 90 }}
          /><br />
          <input
            accept="image/*"
            onChange={handleChange("photo")}
            style={{
              display: "none",
            }}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="secondary"
              styles={{
                height: 30,
                marginBottom: 5,
              }}
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label> 
          <span
            styles={{
              verticalAlign: "super",
            }}
          >
            {values.photo ? values.photo.name : ""}
          </span>
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error">
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="orange"
            variant="contained"
            disabled={values.text === ""}
            onClick={clickPost}
            style={{
              margin: "2px",
            }}
          >
            POST
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default NewPost;
