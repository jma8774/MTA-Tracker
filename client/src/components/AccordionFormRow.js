import React from 'react';
import { Link } from 'react-router-dom'
import { TrainIcon } from './index.js';
import { Grid, Box } from '@material-ui/core';

/*
href links will have to change when it is deployed
*/
const TriLine = ({ train, classes }) => {
  return (
    <Grid item xs={4}>
      <Box component={Link} to={"/line/" + train}>
        <TrainIcon train={train} width={45} />
      </Box>
    </Grid>
  )
}

const QuadLine = ({ train, classes }) => {
  return (
    <Grid item xs={3} >
      <Box component={Link} to={"/line/" + train}>
        <TrainIcon train={train} width={45} />
      </Box>
    </Grid>
  )
}

export { TriLine, QuadLine };