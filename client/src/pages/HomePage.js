import 'fontsource-roboto';
import React from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, Typography, unstable_createMuiStrictModeTheme as createMuiTheme, Button, TextField, Container, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
// Custom Components
import NavBar from '../components/NavBar'

// Material UI CSS
const styles = theme => ({
  root: {
  },
  mt3: {
    marginTop: theme.spacing(3),
  },
  mb3: {
    marginBottom: theme.spacing(3),
  }
});

// Material UI Theme
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

class App extends React.Component {
  render() {
    // Get MUI CSS
    const { classes } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar/>
        <Container className={classes.root}>
          {/* Some Examples, find more at https://material-ui.com/components/button/ and https://material-ui.com/api/button/ */}
          <Alert variant="filled" severity="success" onClose={() => { }}>
            Material UI Alert!
        </Alert>
          <Box my={3}>
            <TextField label="Material UI Textfield" variant="filled" size="small" />
            <Button variant="contained" color="primary">
              Material UI Button!
          </Button>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);