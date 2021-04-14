import { React, useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useStyles } from '../styles/LoginRegisterStyles';
import LogIn from '../components/LogIn';
import Register from '../components/Register';
import '../styles/LoginRegisterPage.css';

/*
https://unsplash.com/photos/PJzeDJAw3oI
https://unsplash.com/photos/k_j7olQiqAw
https://unsplash.com/photos/8mswK-LU5Vs
*/

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Montserrat, san-serif'
  }
});

theme.typography.h1 = {
  fontSize: '2.5rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '3rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '4rem',
  },
}

const LoginRegister = () => {
  const classes = useStyles();

  const [toggleView, setToggleView] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleClick = (e) => {
    e.preventDefault();
    return (toggleView === 0 ? setToggleView(1) : setToggleView(0));
  }

  return (
    <div>
      <ul className="slideshow">
        <li><span>p1</span></li>
        <li><span>p2</span></li>
        <li><span>p3</span></li>
      </ul>

      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
        className={`${classes.grid} + ${classes.root}`}
      >
        <Grid item>
          <h2>img svg</h2>
        </Grid>
        <Grid item>
          <ThemeProvider theme={theme}>
            <Typography variant="h1" className="company-name">MTA Tracker</Typography>
          </ThemeProvider>
        </Grid>
      </Grid>

      <Container maxWidth="sm" className={`${classes.containerContent} + ${classes.root}`}>
        {toggleView === 0 ? <LogIn onClick={toggleClick} styles={classes} /> : <Register onClick={toggleClick} styles={classes} />}
      </Container>
    </div>
  )
}

export default LoginRegister;