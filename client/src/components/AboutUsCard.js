import React from 'react';
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import {
    CssBaseline,
    Typography,
    createMuiTheme,
    Container,
    Box,
    Button,
  } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      border: "none",
      background: "none"
    },

    container: {
      textAlign: "center",
    },

    imageClass: {
      maxHeight: 150,
      borderRadius: 250,
    },

    textContainer: {
      margin: 'auto',
      paddingTop: 75,
      maxWidth: 500,
    },

    nameContainer: {
      paddingTop: 15,
    },

    nameText: {
      fontSize: 24,
    }
})

export default function AboutUsCard({message, Image, Link, Name}) {
    const classes = useStyles()
    return(
          <Box className = {classes.container}>
            <a href = {Link}>
              <img className = {classes.imageClass} src = {Image}/>
            </a>
            <Box className = {classes.nameContainer}>
              <Typography variant="h5"> {Name} </Typography>
            </Box>
            <Box className = {classes.textContainer}>
              <Typography align = "center"> {message}  </Typography>
            </Box>
          </Box>
      )
  }