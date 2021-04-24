import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import LocationOnIcon from '@material-ui/icons/LocationOn';
// Custom Components
import TrainIcon from './TrainIcon.js'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    maxWidth: 345,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  divider: {
    marginTop: theme.spacing(-2),
  },
}));

function getDifference(epoch, curTime) {
  var epochDate = new Date(0); // The 0 there is the key, which sets the date to the epoch
  epochDate.setUTCSeconds(epoch)
  const diff = epochDate - curTime
  const inMinutes = diff/(1000*60)
  if(inMinutes < 0)
    return "Departed"
  else if(inMinutes >= 1)
    return inMinutes.toFixed(0) + ' min'
  else
    return "Now"
}

export default function StopCard(props) {
  const {stopId, stopInfo, curTime, isFavorite} = props
  var trains = stopInfo.trains
  
  const {lat, lon} = stopInfo.coordinates
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  React.useEffect(() => {
    setExpanded(false)
  }, [stopId]);

  const [favorite, setFavorite] = React.useState(isFavorite)
  const handleFavorite = () => {
    const params = {
      method: favorite === "default" ? "put" : "delete",
      credentials: "include",
      body: JSON.stringify({ "stopId": stopId }),
      headers:{          
        'Content-Type': 'application/json'
      },
    }
    // For some reason axios is not working, so I'm using regular fetch
    fetch('http://localhost:8080/api/user/favorite/', params)
    .then((res) => res.json())
    .then((data) => {
      console.log("Favorites", data.favorites)
      setFavorite(favorite === "default" ? "secondary" : "default");
    })
    .catch((err) => console.log(err))
  }

  return (
    <Box component={Card} className={classes.root} boxShadow={3}>
      <CardHeader
        action={
          <Box mt={1} mr={1}>
            <IconButton size='small' target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`} rel="noopener noreferrer">
              <LocationOnIcon/>
            </IconButton>
            <IconButton size='small' aria-label="favorite" color = {favorite} onClick = {handleFavorite}>
              <FavoriteIcon/>
            </IconButton>
          </Box>
        }
        title={stopInfo.stopName}
        subheader={stopId}
      />
      {!expanded &&
      <Box ml={1}>
        {
          Object.keys(trains).map((key, i) => (
            <Box component={Link} to={"/line/" + key} key={i} ml={1}>
              <TrainIcon train={key}/>
            </Box>
          ))
        }
      </Box>
      }
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Divider className={classes.divider}/>
          <Box mt={2}/>
          <Grid container>
            <Grid item xs={6} sm={6} lg={6}>
              <Grid container direction="row">
                <Typography>
                  Uptown
                </Typography>
                <Box ml={1}/>
                <ArrowUpwardIcon/>
              </Grid>
              <Box mt={2}/>
              {
                Object.keys(trains).map((key, i) => 
                  <Typography key={i}>
                    <Box component={Link} to={"/line/" + key} mr={2}>
                      <TrainIcon train={key}/>
                    </Box>
                    {trains[key]['uptown'] ? getDifference(trains[key]['uptown'], curTime) : 'N/A'}
                  </Typography>
                )
              }
            </Grid>
            <Grid item xs={6} sm={6} lg={6}>
              <Grid container direction="row">
                  <Typography>
                    Downtown
                  </Typography>
                  <Box ml={1}/>
                  <ArrowDownwardIcon/>
              </Grid>
              <Box mt={2}/>
              {
                Object.keys(trains).map((key, i) => 
                  <Typography key={i}>
                    <Box component={Link} to={"/line/" + key} mr={2}>
                      <TrainIcon train={key}/>
                    </Box>
                    {trains[key]['downtown'] ? getDifference(trains[key]['downtown'], curTime) : 'N/A'}
                  </Typography>
                )
              }
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Box>
  );
}
