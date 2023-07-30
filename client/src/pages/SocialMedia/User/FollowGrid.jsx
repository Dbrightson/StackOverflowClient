import React from "react";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useSelector } from 'react-redux'
export default function FollowGrid(props) {
  var User = useSelector((state) => (state.currentUserReducer))
  return (
    <div
      styles={{
        paddingTop: "2px",
        display: "flex",
        // flexDirection:'row',
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        background: "#ffff",
      }}
    >
      <Grid
        cellHeight={160}
        styles={{
          width: 500,
          height: 220,
        }}
        cols={4}
      >
        {props.people.map((person, i) => {
          return (
            <Grid style={{ height: 220 }} key={i}>
              {/* <Link to={"/SocialMedia/User/" + person._id}> */}
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
                <Typography
                  style={{
                    textAlign: "center",  
                    marginTop: 10,
                  }}
                >
                  {person.name}
                </Typography>
              {/* </Link> */}
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

FollowGrid.propTypes = {
  people: PropTypes.array.isRequired,
};
