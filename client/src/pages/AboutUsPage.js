import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import {
  CssBaseline,
  Typography,
  createMuiTheme,
  Container,
  Box,
  Grid,
} from "@material-ui/core";
// Custom Component
import { NavBar, AboutUsCard } from '../components/index';

import czImage from "../imgs/github_img/chue.png"
import jmImage from "../imgs/github_img/jiaming.jpg"
import xmImage from "../imgs/github_img/sunny.png"

const czRepo = "https://github.com/Chuezhang2278"
const jmRepo = "https://github.com/jma8774"
const xmRepo = "https://github.com/mxmsunny"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
  },
  gridClass: {
    marginTop: theme.spacing(10),
  },
}));

// Material UI Theme
const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  typography: {
    fontFamily: "Poppins, sans-serif"
  }
});

export default function AboutUsPage(props) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <NavBar/>
      <CssBaseline />
      <Container>
        <Box mt={4}>
          <Typography variant = "h3" align = "center"> <b>Team 1UP</b> </Typography>
          <Box mt={3}/>
          <Typography variant = "body1" className = {classes.textClass} align = "center"> 
            This project was created as part of the CUNY Tech Prep program. We wanted to make something impactful and useful for fellow New Yorkers. 
          </Typography>
          <Box mt={1}/>
          <Typography variant = "body1" className = {classes.textClass} align = "center"> 
            So we decided to make the MTA tracker in hope that the 5+ million New Yorkers that take the MTA trains daily will use it.
          </Typography>
        </Box>

        <Grid container 
              direction="row"
              justify="center"
              alignItems="center"
              alignContent="center"
              className={classes.gridClass}
              spacing={3}
        >
          <Grid item xs={12} md={4} align="center">
            <AboutUsCard 
              image = {czImage}
              github = {czRepo}
              linkedin = {'https://www.linkedin.com/in/chue-zhang/'}
              name = {"Chue Zhang"}
            />
          </Grid>
          <Grid item xs={12} md={4} align="center">
            <AboutUsCard
              image = {jmImage}
              github = {jmRepo}
              linkedin = {'https://www.linkedin.com/in/jma8774/'}
              external = {'https://jma8774.github.io/'}
              name = {"Jia Ming Ma"}
            />
          </Grid>
            <Grid item xs={12} md={4} align="center">
            <AboutUsCard
              image = {xmImage}
              github = {xmRepo}
              linkedin = {'https://www.linkedin.com/in/xiangminmo/'}
              external = {'https://mxmsunny.github.io/'}
              name = {"Xiangmin Mo"}
            />
            </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
