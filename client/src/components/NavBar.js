import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {Toolbar, Button, AppBar} from '@material-ui/core/';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import HomeIcon from '@material-ui/icons/Home';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  githubButton: {
    marginRight: theme.spacing(2),
  },
  leftSide: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
          <IconButton edge="start" className={classes.githubButton} color="inherit" aria-label="menu" target="_blank" href="https://github.com/Chuezhang2278/MTA-Tracker" rel="noopener noreferrer">
            <GitHubIcon/>
          </IconButton>
          <Box className={classes.leftSide}>
            <Button component={Link} to="/home" color="inherit">Home</Button>
            <Button component={Link} to="/about" color="inherit">About us</Button>
            {/* For Testing */}
            <Button component={Link} to="/line/d" color="inherit">D Train (Test)</Button>
            <Button component={Link} to="/nearby" color="inherit">Nearby(Test)</Button>
          </Box>
          <Button component={Link} to="/" color="inherit" >Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}