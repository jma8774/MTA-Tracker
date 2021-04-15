import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {Toolbar, Button, AppBar} from '@material-ui/core/';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  login: {
    position: 'absolute',
    left: '95%',
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
          <Button color="inherit">Home</Button>
          <Button color="inherit">About us</Button>
          <Button color="inherit">Help</Button>

          <Button className = {classes.login} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}