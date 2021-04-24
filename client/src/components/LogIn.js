import { React, useState } from 'react';
import { Grid, TextField, Button, IconButton, InputAdornment, Link as MUILink } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useHistory, Link } from 'react-router-dom';
import useForm from './useForm';
import auth from '../services/auth';

/* Still need to add validation for checking right username and password*/

const initialValues = {
  username: '',
  password: '',
}

const LogIn = ({ onClick, styles }) => {
  const { values, errors, setErrors, handleChange } = useForm(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [failed, setFailed] = useState(false);
  const history = useHistory();

  const validate = () => {
    let temp= {};
    temp.username = values.username ? "" : "This field is required";
    temp.password = values.password ? "" : "This field is required";
    setErrors({
      ...temp
    })

    return Object.values(temp).every(x => x === "");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`username: ${values.username}`);
    console.log(`password: ${values.password}`);

    if(validate()){
      auth.authenticate(values.username, values.password)
        .then((user) => {
          history.push("/home");
        })
        .catch((err) => {
          setFailed(true);
        });
    }
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', fontSize: '2em' }}>Log In</h2>
      <form onSubmit={handleSubmit} className={styles.label} autoComplete="off">
        { failed ? <div style={{color: 'red'}}>Login Failed</div> : null}
        <TextField
          fullWidth={true}
          variant="standard"
          label="Username"
          name="username"
          value={values.username}
          onChange={handleChange}
          error= {errors.username ? true : false}
          helperText= {errors.username}
          FormHelperTextProps= {{classes: {root: styles.helperTextRoot}}}
          InputLabelProps={{ shrink: true, }}
          InputProps={{ className: styles.textField, disableUnderline: true }}
        />
        <TextField
          fullWidth={true}
          variant="standard"
          label="Password"
          type={showPassword ? "text": "password"}
          name="password"
          value={values.password}
          onChange={handleChange}
          error= {errors.password ? true : false}
          helperText= {errors.password}
          FormHelperTextProps= {{classes: {root: styles.helperTextRoot}}}
          InputLabelProps={{ shrink: true, }}
          InputProps={{ 
            className: styles.textField, 
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <h3>Don't have an Account? <MUILink href="#" className={styles.link} onClick={onClick}>Register Here!</MUILink></h3>
        <Button
          type="submit"
          size="large"
          fullWidth={true}
          variant="contained"
          color="primary"
          className={styles.button}>
          Log In
        </Button>
      </ form>

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Link to="/about" className={styles.link} style={{ paddingRight: "10px", marginRight: "3px" }}>About Us</Link>
        </Grid>
        <Grid item>
          <Link to="#" className={styles.link} style={{ borderLeft: "1px solid white", paddingLeft: "15px", marginLeft: "3px" }}>Terms of Use</Link>
        </Grid>
      </Grid>

      <h3>This is a non-profit website and all intellectual property is owned by MTA.</h3>
    </div >
  )
}

export default LogIn;