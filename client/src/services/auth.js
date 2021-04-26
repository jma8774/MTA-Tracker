// This service object was adapted from here: 
//  https://tylermcginnis.com/react-router-protected-routes-authentication/
//
// This version was modified to use real authentication implemented
// in the backend api. It was also modified to return promises instead
// of using callbacks `cb`.

const auth = {
  isAuthenticated: false,
  signup(username, password, email){
    return fetch('../api/user/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if(!response.ok) {
          throw new Error('Register Failed');
        }
        return response.json();
      })
      .then((body) => {
        this.isAuthenticated = true;
        return body;
      })
  },
  authenticate(username, password) {
    return fetch('../api/user/login', { 
      method: 'POST',
      body: JSON.stringify({ username, password }),
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if(!response.ok) {
          throw new Error('Login Failed');
        }

        return response.json();
      })
      .then((body) => {
        this.isAuthenticated = true;
        return body;
      });
  },
  signout(cb) {
    return fetch('../api/user/logout', { 
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if(!response.ok) {
          throw new Error('Logout Failed');
        }

        return response.json();
      })
      .then((body) => {
        this.isAuthenticated = false;
        return body;
      });
  }
}

export default auth;