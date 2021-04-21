import React from 'react';
import TrainIcon from '../components/TrainIcon.js';
import { Grid } from '@material-ui/core';

/*
href links will have to change when it is deployed
*/
const TriLine = ({ train, classes }) => {
  return (
    <Grid item xs={4}>
      <a href={`http://localhost:3000/line/${train}`} className={classes.expandClick}>
        <TrainIcon train={train} width={45} />
      </a>
    </Grid>
  )
}

const QuadLine = ({ train, classes }) => {
  return (
    <Grid item xs={3}>
      <a href={`http://localhost:3000/line/${train}`} className={classes.expandClick}>
        <TrainIcon train={train} width={45} />
      </a>
    </Grid>
  )
}

export { TriLine, QuadLine };