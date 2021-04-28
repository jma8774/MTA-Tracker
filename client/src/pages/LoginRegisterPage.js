import { React, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { useStyles } from '../styles/LoginRegisterStyles';
import LogIn from '../components/LogIn';
import Register from '../components/Register';
import '../styles/LoginRegisterPage.css';
import logo from '../imgs/svg/mticon.svg';

/*
https://unsplash.com/photos/PJzeDJAw3oI
https://unsplash.com/photos/k_j7olQiqAw
https://unsplash.com/photos/8mswK-LU5Vs
*/

const LoginRegister = () => {
  const classes = useStyles();

  const [toggleView, setToggleView] = useState(0);

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
          <img src={logo} width="120px" height="120px" alt="icon with train and magnifying glass"/>
        </Grid>
        <Grid item>
          <h1 className={classes.title}>MTA Tracker</h1>
        </Grid>
      </Grid>

      <Container maxWidth="sm" className={`${classes.containerContent} + ${classes.root}`}>
        {toggleView === 0 ? <LogIn onClick={toggleClick} styles={classes} /> : <Register onClick={toggleClick} styles={classes} />}
      </Container>
    </div>
  )
}

export default LoginRegister;