import React from 'react';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
//Material UI
import { Container, Accordion, AccordionDetails, AccordionSummary, Grid, CssBaseline, Box, Typography, Tooltip } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TimerIcon from '@material-ui/icons/Timer';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
//Custom Components
import { useStyles } from '../styles/HomePageStyles';
import { NavBar, TriLine, QuadLine, StopCard, StopCardMobile, AlertSnackbar, BackToTop } from '../components/index';

const numbertrains = ["1", "2", "3", "4", "5", "6", "7", "5x", "6x", "7x"];
const quadtrains = ["n", "q", "r", "w", "b", "d", "f", "m"];
const tritrains = ["a", "c", "e", "z", "j", "g", "l"];

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
  typography: {
    fontFamily: 'Poppins, sans-serif'
  }
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
      axios.get('/api/station/favorite/', {withCredentials: true})
      .then(res => {
        console.log("Updated Favorite Stations")
        const data = res.data
        var tmp = []
        for(var i in data) 
          tmp.push([i, data[i]]);
        setStops(Object.keys(data).length > 0 ? tmp : null);
        setStatus(true)
      })
      .catch(error =>
        console.log(error)
      )
    }
    function fetchUser() {
      axios.get('/api/user/data', {withCredentials: true})
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
    const interval = setInterval(fetchFavoriteStops, 30000)
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <BackToTop />
      <CssBaseline />
      { status &&
        <AlertSnackbar msg="Bookmarks updated!" duration={2000} severity='success'/>
      }
      <Container>
        <Box mt={4} mb={7} align="center">
          <Typography variant="h4">
            <b>Welcome, {username}!</b>
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
                  <Grid item xs={12}>
                    <Grid container direction="row" justify="flex-end">
                      <Box mr={1} mt={2}>
                        <Tooltip title={<Typography variant='caption'>Information is refreshed every 30 seconds</Typography>}>
                          <TimerIcon/>
                        </Tooltip>
                      </Box>
                      <Box mr={2} mt={2}>
                        <Tooltip title={<Typography variant='caption'>Click on any of the supported train icons to go to their respected page</Typography>}>
                          <HelpOutlineIcon/>
                        </Tooltip>
                      </Box>
                    </Grid>
                  </Grid>
                  { 
                    stops.map((val, i) => 
                      <Grid key={val[0]} item xs={12} md={6} lg={4}>
                        <Box mt={3}>
                          {
                            isMobile
                            ? <StopCardMobile stopId={val[0]} stopName={val[1].stopName} trains={val[1].trains} coordinates={val[1].coordinates} curTime={curTime} isFavorite={"secondary"}/>
                            : <StopCard stopId={val[0]} stopName={val[1].stopName} trains={val[1].trains} coordinates={val[1].coordinates} curTime={curTime} isFavorite={"secondary"}/>
                          }
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