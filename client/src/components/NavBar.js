import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {Toolbar, Button, AppBar} from '@material-ui/core/';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import GitHubIcon from '@material-ui/icons/GitHub';
import auth from '../services/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),
  },
  githubButton: {
    marginRight: theme.spacing(2),
  },
  leftSide: {
    flexGrow: 1,
  },
  button: {
    fontFamily: "Montserrat, san-serif",
    fontSize: "1em",
    '&.MuiButton-root': {
      borderRadius: '0px',
    }
  },
  divider: {
    borderRight: '1px solid white'
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    auth.signout().then(() => history.push('/'));
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
          <IconButton edge="start" className={classes.githubButton} color="inherit" aria-label="menu" target="_blank" href="https://github.com/Chuezhang2278/MTA-Tracker" rel="noopener noreferrer">
            <GitHubIcon/>
          </IconButton>
          <Box className={classes.leftSide}>
            <Button component={Link} to="/home" color="inherit" className= {`${classes.button} + ${classes.divider}`}>Home</Button>
            <Button component={Link} to="/nearby" color="inherit" className= {`${classes.button} + ${classes.divider}`}>Nearby</Button>
            <Button component={Link} to="/about" color="inherit" className= {classes.button}>About us</Button>
          </Box>
          <Button component={Link} to="/" color="inherit" className= {classes.button} onClick={handleClick}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}