import { React, useState } from 'react';
import { TextField, Button, IconButton, InputAdornment, Box, Link as MUILink } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useHistory } from 'react-router-dom';
import useForm from './useForm';
import auth from '../services/auth';

const initialValues = {
  username: '',
  password: '',
  rePassword: '',
  email: '',
}

const Register = ({ onClick, styles }) => {
  const { values, errors, setErrors, handleChange } = useForm(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [failed, setFailed] = useState(false);
  const history = useHistory();

  const validate = () => {
    let temp = {};
    temp.username = values.username ? "" : "This field is required";
    temp.email = (/$^|.+@.+..+/).test(values.email) ? "" : "Email is invalid";
    temp.password = values.password.length > 6 ? "" : "Minimum 7 characters required";
    temp.rePassword = values.password === values.rePassword ? "" : "Passwords do not match";

    setErrors({
      ...temp
    })

    return Object.values(temp).every(x => x === "");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      auth.signup(values.username, values.password, values.email)
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
      <h2 style={{ textAlign: 'center', fontSize: '2em' }}>Register</h2>
      <form onSubmit={handleSubmit} className={styles.label} autoComplete="off">
        {failed ?
          <Box className={styles.errorBox} mb={2}>
            <ul>
              <li className={styles.errorMessage}>
                Username or email already taken
              </li>
            </ul>
          </Box>
          :
          null}
        <TextField
          fullWidth={true}
          variant="standard"
          label="Username"
          name="username"
          value={values.username}
          onChange={handleChange}
          error={errors.username ? true : false}
          helperText={errors.username}
          FormHelperTextProps={{ classes: { root: styles.helperTextRoot } }}
          InputLabelProps={{ shrink: true, }}
          InputProps={{ className: styles.textField, disableUnderline: true }}
        />
        <TextField
          fullWidth={true}
          variant="standard"
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email ? true : false}
          helperText={errors.email}
          FormHelperTextProps={{ classes: { root: styles.helperTextRoot } }}
          InputLabelProps={{ shrink: true, }}
          InputProps={{ className: styles.textField, disableUnderline: true }}
        />
        <TextField
          fullWidth={true}
          variant="standard"
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password ? true : false}
          helperText={errors.password ? errors.password : "Password should be at least 7 characters long"}
          FormHelperTextProps={{ classes: { root: styles.helperTextRoot } }}
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
        <TextField
          fullWidth={true}
          variant="standard"
          label="Re-enter Password"
          type={showRePassword ? "text" : "password"}
          name="rePassword"
          value={values.rePassword}
          onChange={handleChange}
          error={errors.rePassword ? true : false}
          helperText={errors.rePassword ? errors.rePassword : "Password must match"}
          FormHelperTextProps={{ classes: { root: styles.helperTextRoot } }}
          InputLabelProps={{ shrink: true, }}
          InputProps={{
            className: styles.textField,
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle re-enter password visibility"
                  onClick={() => setShowRePassword(!showRePassword)}
                  onMouseDown={() => setShowRePassword(!showRePassword)}
                >
                  {showRePassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <h3>Have an account? <MUILink href="#" className={styles.link} onClick={onClick}>Log in here!</MUILink></h3>
        <Button
          type="submit"
          size="large"
          fullWidth={true}
          variant="contained"
          color="primary"
          className={styles.button}>
          Register
        </Button>
      </form>

      <h3 className={styles.margin}>This is a non-profit website and all intellectual property is owned by&nbsp;
        <MUILink href="https://new.mta.info/" className={styles.link}>MTA</MUILink>
      .</h3>

    </div>
  )
}

export default Register;