import React from 'react';
import axios from 'axios';
import { Container, Accordion, AccordionDetails, AccordionSummary, Grid, CssBaseline, Box, Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from '../styles/HomePageStyles';
import NavBar from '../components/NavBar';
import { TriLine, QuadLine } from '../components/AccordionFormRow';
import StopCard from '../components/StopCard.js'
import AlertSnackbar from '../components/AlertSnackbar'

const numbertrains = ["1", "2", "3", "4", "5", "6", "7", "5x", "6x", "7x"];
const quadtrains = ["n", "q", "r", "w", "b", "d", "f", "m"];
const tritrains = ["a", "c", "e", "z", "j", "g", "l"];

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const Home = () => {
  const classes = useStyles();
  const [username, setUsername] = React.useState(null)
  const [status, setStatus] = React.useState(false)
  const [stops, setStops] = React.useState(null)
  const curTime = new Date()


  React.useEffect(() => {
    function fetchFavoriteStops() {
      setStatus(false)
      axios.get('http://localhost:8080/api/station/favorite/', {withCredentials: true})
      .then(res => {
        console.log("Updated Favorite Stations")
        const data = res.data
        var tmp = []
        for(var i in data) 
          if(data[i].stopName)
          tmp.push([i, data[i]]);
        setStops(Object.keys(data).length > 0 ? tmp : null);
        setStatus(true)
      })
      .catch(error =>
        console.log(error)
      )
    }
    function fetchUser() {
      axios.get('http://localhost:8080/api/user/data', {withCredentials: true})
      .then(res => {
        const data = res.data
        setUsername(data.username)
      })
      .catch(error =>
        console.log("Error", error)
      )
    }
    fetchUser()
    fetchFavoriteStops()
    const interval = setInterval(fetchFavoriteStops, 10000)
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <CssBaseline />
      { status &&
        <AlertSnackbar msg="Bookmarks updated!" duration={2000} severity='success'/>
      }
      <Container>
        <Box mt={4} mb={7} align="center">
          <Typography variant="h4">
            <b>Welcome {username}!</b>
          </Typography>
          <br/>
          <Typography variant="h6" color="textSecondary">
            You can search for train stations and their train arrival times by clicking on one of the icons below.
          </Typography>
        </Box>
        <Accordion square={true} defaultExpanded classes={{ root: classes.accordionRoot }}>
          <AccordionSummary
            classes={{ content: classes.accordionSummaryContent }}
            expandIcon={<ExpandMoreIcon style={{ fill: 'white' }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h2>Search by Line</h2>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={10} align="center" justify="center" alignItems="flex-start">
              <Grid container item xs={10} sm={4} spacing={3}>
                {numbertrains.map((train, index) => {
                  return (
                    <TriLine key={index} train={train} classes={classes} />
                  )
                })}
              </Grid>
              <Grid container item xs={10} sm={4} spacing={3}>
                {quadtrains.map((train, index) => {
                  return (
                    <QuadLine key={index} train={train} classes={classes} />
                  )
                })}
              </Grid>
              <Grid container item xs={10} sm={4} spacing={3}>
                {tritrains.map((train, index) => {
                  return (
                    <TriLine key={index} train={train} classes={classes} />
                  )
                })}
              </Grid>
            </Grid>
          </AccordionDetails>
          <Box mb={3}/>
        </Accordion>

        <Accordion square={true} defaultExpanded classes={{ root: classes.accordionRoot }}>
          <AccordionSummary
            classes={{ content: classes.accordionSummaryContent }}
            expandIcon={<ExpandMoreIcon style={{ fill: 'white' }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h2>Your Bookmarks</h2>
          </AccordionSummary>
          <AccordionDetails>
            {
              stops
              ?
                <Grid container align="center">
                  { 
                    stops.map((val, i) => 
                      <Grid key={val[0]} item xs={12} md={6} lg={4}>
                        <Box mt={3}>
                          <StopCard stopId = {val[0]} stopInfo={val[1]} curTime={curTime} isFavorite={"secondary"}/>
                        </Box>
                      </Grid>
                    )
                  }
                </Grid>
              :
                <Typography>
                </Typography>
            }
          </AccordionDetails>
        </Accordion>
      </Container>
      <Box mb={3}/>
    </ThemeProvider>
  )
}

export default Home;