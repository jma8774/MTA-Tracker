import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import auth from '../services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <div>
      {
        <Route {...rest} render={(props) => (
          auth.checkAuth() ?
            <Component {...props} />
            :
            <div>
              <Redirect to={{ pathname: '/' }} />
            </div>
        )} />
      }
    </div>
  )
};

export default PrivateRoute;