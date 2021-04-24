import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    Typography,
    Box,
    Paper,
  } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      border: "none",
      background: "none"
    },
    imageClass: {
      maxHeight: 150,
      borderRadius: 250,
    },
    nameContainer: {
      paddingTop: 15,
    },
    nameText: {
      fontSize: 24,
    },
    paper: {
      textAlign: "center",
      maxWidth: 500,
      backgroundColor: "#242424",
    }
})

export default function AboutUsCard({message, Image, Link, Name}) {
    const classes = useStyles()
    return(
          <Box component={Paper} className = {classes.paper} px={2} my={2}>
            <Box pt={3}>
              <a href = {Link}>
                <img alt="GitHub link" className = {classes.imageClass} src = {Image}/>
              </a>
            </Box>
            <Box className = {classes.nameContainer} mt={1} mb={3}>
              <Typography variant="h5"> {Name} </Typography>
            </Box>
            <Box className = {classes.textContainer} pb={3}>
              <Typography variant="body1" align = "center" color="textSecondary"> {message}  </Typography>
            </Box>
          </Box>
      )
  }