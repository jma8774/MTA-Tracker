import 'fontsource-roboto';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import HttpsRedirect from 'react-https-redirect';
import LoginRegister from './pages/LoginRegisterPage';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUsPage';
import LinePage from './pages/LinePage';
import NearbyPage from './pages/NearbyPage';
import PrivateRoute from './components/PrivateRoute';


const App = () => {
  return (
    <HttpsRedirect>
      <Router>
        <Switch>
          <Route exact path="/" component= {LoginRegister} />
          <PrivateRoute path="/home" component= {HomePage} />
          <Route path="/about" component= {AboutUs} />
          <PrivateRoute path="/line/:train" component={LinePage}/>
          <PrivateRoute path="/nearby" component={NearbyPage}/>
        </Switch>
      </Router>
    </HttpsRedirect>
  )
}

export default App;
