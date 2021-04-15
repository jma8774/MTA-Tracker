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
import NavBar from './components/NavBar'


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginRegister />
        </Route>
        <Route path="/home">
          <NavBar/>
          <HomePage />
        </Route>
        <Route path="/about">
          <AboutUs />
        </Route>
        <Route path="/line/:train" component={LinePage}/>
        <Route path="/nearby" component={NearbyPage}/>
      </Switch>
    </Router>
  )
}

export default App;
