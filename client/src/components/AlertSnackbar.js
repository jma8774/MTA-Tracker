import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function AlertSnackbar(props) {
  const { msg, duration, severity } = props
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar 
        open={open} 
        autoHideDuration={duration ? duration : 5000} 
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity ? severity : 'success'}>
          {msg ? msg : 'No message'}
        </Alert>
      </Snackbar>
    </div>
  );
}
