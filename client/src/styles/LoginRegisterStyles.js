import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    zIndex: 2,
  },
  grid: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.25),
    '@media (min-width:960px)': {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1.25),
    },
    '@media (min-width:1280px)': {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(2.25),
    }
  },
  labelFocus: {
    '& label.Mui-focused': {
      color: 'rgb(255,255,255)',
      fontWeight: 'bold'
    },
  },
  containerContent:{
    padding: theme.spacing(3),
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  inputLabel: {
    fontFamily: 'Montserrat, san-serif',
    color: 'rgb(255,255,255)'
  },
  input: {
    borderRadius: 3,
    backgroundColor: 'rgb(255,255,255)',
    padding: '5px 12px',
    fontSize: '1.5em',
    fontFamily: 'Montserrat, san-serif',
    '@media (min-width:0px)': {
      width: '390px'
    },
    '@media (min-width:600px)': {
      width: '550px'
    },
  },
  link: {
    textDecoration: 'underline', 
    color:'rgb(33,150,243)',
  },
  button: {
    marginBottom: '20px',
    fontSize: '1.25rem',
    fontFamily: "Montserrat, san-serif"
  },
  disabled: {
    pointerEvents: 'none',
  }
}))

export { useStyles };