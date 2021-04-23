import 'fontsource-roboto';
import axios from 'axios';
import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {
  CssBaseline,
  Typography,
  Container,
  Box,
  Grid,
  Divider,
  IconButton,
  Backdrop,
  TextField,
  CircularProgress,
  Tooltip
} from "@material-ui/core";
import ReorderIcon from '@material-ui/icons/Reorder';
import Autocomplete from '@material-ui/lab/Autocomplete';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import TimerIcon from '@material-ui/icons/Timer';
// Custom Components
import StopCard from '../components/StopCard'
import NavBar from '../components/NavBar'
import AlertSnackbar from '../components/AlertSnackbar'


// Material UI CSS
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  divider: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
}));

// Material UI Theme
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

export default function NearbyPage(props) {
  const classes = useStyles()
  const curTime = new Date()
  const [stops, setStops] = React.useState(null)
  const [available, setAvailable] = React.useState(null)
  const [backdrop, setBackdrop] = React.useState(true)
  const [location, setLocation] = React.useState(null)
  const [status, setStatus] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const handleReverse = () => {
    setStops(stops.slice().reverse())
  }
  
  React.useEffect(() => {
    if (navigator.geolocation) {
      setAvailable(true)
      console.log('GeoLocation is available!')
      navigator.permissions.query({ name: "geolocation" })
      .then(result => {
        if (result.state === "granted") {
          //If granted then you can directly call your function here
          navigator.geolocation.getCurrentPosition(pos => {
            var obj = {}
            obj['lat'] = pos.coords.latitude
            obj['lon'] = pos.coords.longitude
            setBackdrop(false)
            setLocation(obj)
          });
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(pos => {
            var obj = {}
            obj['lat'] = pos.coords.latitude
            obj['lon'] = pos.coords.longitude
            setBackdrop(false)
            setLocation(obj)
          });
        } else if (result.state === "denied") {
          //If denied then you have to show instructions to enable location
          setBackdrop(false)
        }
        console.log("Geolocation", result.state);
      })
    } else {
      setAvailable(false)
      console.log('GeoLocation not available!')
    }
  }, []);

  React.useEffect(() => {
    if(location === null)
      return
    window.scrollTo(0, 0)
    
    function fetchData() {
      setStatus(false)
      axios.get(`http://localhost:8080/api/nearby/lat/${location.lat}/lon/${location.lon}/dist/2`)
      .then(res => {
        console.log('Data refreshed')
        console.log("Response", res)
        const data = res.data
        console.log("Data", data)
        var tmp = []
        for(var i in data) 
          if(data[i].stopName)
          tmp.push([i, data[i]]);
        setStops(Object.keys(data).length > 0 ? tmp : null);
        setStatus(true)
      })
      .catch(error =>
        console.log("Error", error)
      )
    }

    fetchData()
    const interval = setInterval(fetchData, 10000)

    // Return does something when the page dismounts
    return () => clearInterval(interval);
  }, [location]);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar/>
      { status &&
        <AlertSnackbar msg="Stops updated!" duration={2000} severity='success'/>
      }
      <Container className={classes.root}>
        <Backdrop open={backdrop}>
          <Typography variant="h6" color="initial"> 
            {
              available
              ? 'Geolocation is supported by your browser, please give permission to get access to nearby stops.'
              : 'Geolocation is not supported by your browser.'
            }
            <br/> 
            <br/> 
            <CircularProgress/>
          </Typography>
        </Backdrop>
        <Box my={4}>
          <Typography variant="h3">
            <b>Nearby Stops</b>
          </Typography>
        </Box>
        <Typography variant="h6" color="textSecondary">
          If your browser allows it and you give permission, we can help look for stops near your location at a 2 KM radius.
        </Typography>
        <Divider className={classes.divider} variant="middle"/>
          {
            !backdrop && 
            (
              location
              ? 
                stops
                ?
                  <React.Fragment>
                    <Grid container justify="flex-end">
                      <Box mr={1} mt={2}>
                        <Tooltip title={<Typography variant='caption'>Information is refreshed every 10 seconds</Typography>}>
                          <TimerIcon/>
                        </Tooltip>
                      </Box>
                      <Box mr={2} mt={2}>
                        <Tooltip title={<Typography variant='caption'>Click on any of the supported train icons to go to their respected page</Typography>}>
                          <HelpOutlineIcon/>
                        </Tooltip>
                      </Box>
                      <Autocomplete
                        id="search-stop"
                        options={stops}
                        getOptionLabel={(option) => option[1].stopName}
                        style={{ width: theme.spacing(30)}}
                        onChange={(e, val) => setSearch(val ? val[1].stopName : '')}
                        renderInput={(params) => <TextField {...params} label="Search" variant="outlined"/>}
                      />
                      <Box mr={3}>
                        <Tooltip title={<Typography variant='caption'>Reverse Order</Typography>}>
                          <IconButton aria-label="sort" onClick={handleReverse}>
                            <ReorderIcon fontSize="large"/>
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Grid>
                    <Grid container align="center">
                      { 
                        stops.map((val, i) => 
                          val[1].stopName.toLowerCase().includes(search.toLowerCase()) &&
                          <Grid key={i} item xs={12} md={6} lg={4}>
                            <Box mt={3}>
                              <StopCard stopId = {val[0]} stopInfo={val[1]} curTime={curTime}/>
                            </Box>
                          </Grid>
                        )
                      }
                    </Grid>
                  </React.Fragment>
                :
                  <Backdrop open={!stops}>
                    <Box>
                      <Typography variant="h5" color="initial"> Please wait, fetching information... </Typography>
                      <Typography variant="subtitle1" color="textSecondary"> Pleaes refresh the page if it takes longer than 5 seconds. Either that train is not currently running or the fetch from MTA failed. </Typography>
                    </Box>
                  </Backdrop>
              : 'Geolocation denied by the user, please renable it for this website.'
            )
          }
      <Box my={4}/>
      </Container>
    </ThemeProvider>
  )
}
