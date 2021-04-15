import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {Toolbar, Button, AppBar} from '@material-ui/core/';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
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
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <HomeIcon></HomeIcon>
          </IconButton>
          <Box className={classes.leftSide}>
            <Button component={Link} to="/home" color="inherit">Home</Button>
            <Button component={Link} to="/about" color="inherit">About us</Button>
            <Button component={Link} to="/help" color="inherit">Help</Button>
          </Box>
          <Button component={Link} to="/" color="inherit" >Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}