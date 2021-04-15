import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import {
  CssBaseline,
  Typography,
  createMuiTheme,
  Container,
  Box,
  Grid,
  Divider,
  IconButton,
  Backdrop,
  TextField,
} from "@material-ui/core";
import clsx from "clsx";
// Custom Component
import NavBar from '../components/NavBar'

const useStyles = makeStyles((theme) => ({
  root: {},
}));

// Material UI Theme
const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export default function AboutUsPage(props) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <NavBar/>
      <CssBaseline />
      <Container className={classes.root}>
      </Container>
      <Typography>
        Hello
      </Typography>
    </ThemeProvider>
  );
}
