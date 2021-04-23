import 'fontsource-roboto';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import LoginRegister from './pages/LoginRegisterPage';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUsPage';
import LinePage from './pages/LinePage';
import NearbyPage from './pages/NearbyPage';
import PrivateRoute from './components/PrivateRoute';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component= {LoginRegister} />
        <PrivateRoute path="/home" component= {HomePage} />
        <Route path="/about" component= {AboutUs} />
        <PrivateRoute path="/line/:train" component={LinePage}/>
        <PrivateRoute path="/nearby" component={NearbyPage}/>
      </Switch>
    </Router>
  )
}

export default App;
