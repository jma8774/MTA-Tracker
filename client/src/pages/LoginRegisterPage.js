import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import logo from '../imgs/svg/mticon.svg';
import auth from '../services/auth';
import '../styles/LoginRegisterPage.css';
import { LogIn, Register } from '../components/index';
import { useStyles } from '../styles/LoginRegisterStyles';

/*
Background Photos provided by:
* Photo by S on Unsplash: https://unsplash.com/photos/PJzeDJAw3oI
* Photo by Nic Y-C on Unsplash: https://unsplash.com/photos/k_j7olQiqAw
* Photo by Patrick Robery Doyle on Unsplash: https://unsplash.com/photos/8mswK-LU5Vs

Logo Vector Images provided by:
* Magnifying Glass created by Delwar Hossian from Noun Project: https://thenounproject.com/search/?q=magnify&i=589366
* Train created by HideMaru from Noun Project: https://thenounproject.com/search/?q=train&i=3888723
*/

const LoginRegister = () => {
  const classes = useStyles();

  const [toggleView, setToggleView] = useState(0);
  const [username, setUsername] = useState(null)

  const toggleClick = (e) => {
    e.preventDefault();
    return (toggleView === 0 ? setToggleView(1) : setToggleView(0));
  }

  useEffect(() => {
    function fetchUser() {
      axios.get('/api/user/data', {withCredentials: true})
      .then(res => {
        const data = res.data
        if(data && data.username)
          setUsername(data.username)
      })
      .catch(error =>
        console.log(error)
      )
    }
    fetchUser()
  }, [])

  return (
    <div>
      {(username && auth.checkAuth()) ?
        <Redirect to={{ pathname: '/home' }} /> :
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
              <img src={logo} width="120px" height="120px" alt="icon with train and magnifying glass" />
            </Grid>
            <Grid item>
              <h1 className={classes.title}>Simple MTA</h1>
            </Grid>
          </Grid>

          <Container maxWidth="sm" className={`${classes.containerContent} + ${classes.root}`}>
            {toggleView === 0 ? <LogIn onClick={toggleClick} styles={classes} /> : <Register onClick={toggleClick} styles={classes} />}
          </Container>
        </div>
      }
    </div>
  )
}

export default LoginRegister;