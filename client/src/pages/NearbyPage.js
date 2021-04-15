import 'fontsource-roboto';
import { useParams } from 'react-router';
import axios from 'axios';
import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, Typography, unstable_createMuiStrictModeTheme as createMuiTheme, Container, Box, Grid, Divider, IconButton, Backdrop, TextField, CircularProgress} from '@material-ui/core';
import ReorderIcon from '@material-ui/icons/Reorder';
import Autocomplete from '@material-ui/lab/Autocomplete';
// Custom Components
import StopCard from '../components/StopCard.js'
import TrainIcon from '../components/TrainIcon.js'

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
          console.log(result.state);
          //If granted then you can directly call your function here
          navigator.geolocation.getCurrentPosition(pos => {
            var obj = {}
            obj['lat'] = pos.coords.latitude
            obj['lon'] = pos.coords.longitude
            setBackdrop(false)
            setLocation(obj)
          });
        } else if (result.state === "prompt") {
          console.log(result.state);
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
          console.log(result.state);
        }
      })
    } else {
      setAvailable(false)
      console.log('GeoLocation not available!')
    }
  }, []);

    // async function fetchData() {
    //   axios.get('')
    //   .then(res => {
    //     console.log("Response", res)
    //     console.log("Data", res.data)
    //     const data = res.data
    //     if (!ignore) {
    //       var tmp = []
    //       for(var i in data) 
    //         if(data[i].stopName)
    //           tmp.push([i, data[i]]);
    //       setStops(Object.keys(data).length > 0 ? tmp : null);
    //     }
    //   })
    //   .catch(error =>
    //     console.log("Error", error)
    //   )
    // }

    // fetchData();
  
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Box my={4}>
            <Typography variant="h3">
              Nearby Stops
            </Typography>
          </Box>
          <Typography variant="h6" color="textSecondary">
            If your browser allows it and you give permission, we can help look for stops near your location at a 2 KM radius.
          </Typography>
          <Divider className={classes.divider} variant="middle"/>
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
            {
              !backdrop && 
              (
                location
                ? 'Geolocation location received, user is at (' + location.lat + ', ' + location.lon + ').'
                : 'Geolocation denied by the user, please renable it for this website.'
              )
            }
        </Container>
      </ThemeProvider>
    </div>
  )
}
