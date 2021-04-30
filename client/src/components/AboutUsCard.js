import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    Typography,
    Box,
    Paper,
    Grid,
    Link,
  } from "@material-ui/core";
  import LinkedInIcon from '@material-ui/icons/LinkedIn';
  import LinkIcon from '@material-ui/icons/Link';

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
    },
    icons: {
      color: "white",
    }
})

export default function AboutUsCard({image, github, linkedin, external, name}) {
    const classes = useStyles()
    return(
          <Box component={Paper} className = {classes.paper} px={5} my={2} mx={3}>
            <Box pt={3}>
              <Link href={github} target="_blank" rel="noreferrer">
                <img alt="GitHub link" className = {classes.imageClass} src = {image}/>
              </Link>
            </Box>
            <Box className = {classes.nameContainer} mb={2}>
              <Typography variant="h5"> {name} </Typography>
            </Box>
            <Box mt={1} />
            <Grid container direction="row" justify="center">
              <Link href={linkedin} target="_blank" rel="noreferrer">
                <LinkedInIcon className={classes.icons}/>
              </Link>
              <Box mr={1}/>
              {
                external && 
                <Link href={external} target="_blank" rel="noreferrer">
                  <LinkIcon className={classes.icons}/>
                </Link>
              }
            </Grid>
            <Box pb={2}/>
          </Box>
      )
  }