// This service object was adapted from here: 
//  https://tylermcginnis.com/react-router-protected-routes-authentication/
//
// This version was modified to use real authentication implemented
// in the backend api. It was also modified to return promises instead
// of using callbacks `cb`.

const auth = {
  checkAuth() {
    const user = localStorage.getItem('user');
    if (user) {
      return true;
    } else {
      return false;
    }
  },
  async signup(username, password, email) {
    return await fetch('/api/user/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Register Failed');
        }

        localStorage.setItem('user', await response.json());
      })
  },
  async authenticate(username, password) {
    return await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Login Failed');
        }

        localStorage.setItem('user', await response.json());
      })
  },
  signout(cb) {
    return fetch('/api/user/logout', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Logout Failed');
        }

        localStorage.removeItem('user');
        return response.json();
      })
  }
}

export default auth;