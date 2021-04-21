import React from 'react';
import { Container, Accordion, AccordionDetails, AccordionSummary, Grid } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from '../styles/HomePageStyles';
import NavBar from '../components/NavBar';
import { TriLine, QuadLine } from '../components/AccordionFormRow';

const numbertrains = ["1", "2", "3", "4", "5", "6", "7", "5x", "6x", "7x"];
const quadtrains = ["n", "q", "r", "w", "b", "d", "f", "m"];
const tritrains = ["a", "c", "e", "z", "j", "g", "l"];

const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <NavBar />
      <Container>
        <Accordion square={true} defaultExpanded classes={{ root: classes.accordionRoot }}>
          <AccordionSummary
            classes={{ content: classes.accordionSummaryContent }}
            expandIcon={<ExpandMoreIcon style={{ fill: 'white' }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h2>Search by Line</h2>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={10} justify="center" alignItems="flex-start">
              <Grid container item xs={10} sm={4} spacing={3}>
                {numbertrains.map((train, index) => {
                  return (
                    <TriLine key={index} train={train} classes={classes} />
                  )
                })}
              </Grid>
              <Grid container item xs={10} sm={4} spacing={3}>
                {quadtrains.map((train, index) => {
                  return (
                    <QuadLine key={index} train={train} classes={classes} />
                  )
                })}
              </Grid>
              <Grid container item xs={10} sm={4} spacing={3}>
                {tritrains.map((train, index) => {
                  return (
                    <TriLine key={index} train={train} classes={classes} />
                  )
                })}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion square={true} defaultExpanded classes={{ root: classes.accordionRoot }}>
          <AccordionSummary
            classes={{ content: classes.accordionSummaryContent }}
            expandIcon={<ExpandMoreIcon style={{ fill: 'white' }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h2>Your Bookmarks</h2>
          </AccordionSummary>
          <AccordionDetails>
            Stop Cards go here
          </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  )
}

export default Home;