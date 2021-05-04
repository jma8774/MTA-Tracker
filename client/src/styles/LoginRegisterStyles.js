import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    zIndex: 2,
  },
  grid: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.25)
  },
  title: {
    textShadow: "2px 2px rgba(28,28,30,0.9)",
    wordSpacing: "3px",
    fontSize: "2em",
    '@media (min-width:960px)': {
      fontSize: "3em",
    },
    '@media (min-width:1280px)': {
      fontSize: "3.5em",
    }
  },
  label: {
    '& .MuiFormLabel-root': {
      color: 'rgb(255,255,255)',
      fontSize: '1.5em',
      fontFamily: 'Poppins, san-serif',
    },
    '& label.Mui-focused': {
      fontWeight: 'bold'
    },
    '& label.Mui-error': {
      color: 'rgb(255,0,51)',
      fontWeight: 'bold',
    }
  },
  containerContent: {
    padding: theme.spacing(3),
    backgroundColor: "rgba(0,0,0,0.8)",
    boxShadow: '1px 1px rgb(0,0,0)',
    marginBottom: theme.spacing(3),
  },
  textField: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    fontFamily: "Poppins, san-serif",
    padding: theme.spacing(0.75),
    marginBottom: theme.spacing(3)
  },
  helperTextRoot: {
    fontFamily: 'Poppins, san-serif',
    marginTop: theme.spacing(-2.5),
    marginBottom: theme.spacing(1),
    color: 'rgb(255,255,255)',
  },
  link: {
    textDecoration: 'underline',
    color: 'rgb(33,150,243)',
  },
  button: {
    marginBottom: theme.spacing(4),
    fontSize: '1.25rem',
    fontFamily: "Poppins, san-serif"
  },
  disabled: {
    pointerEvents: 'none',
  },
  errorBox: {
    backgroundColor: 'rgb(255, 204, 204)',
    border: '2px solid rgb(255, 0, 51)'
  },
  errorMessage: {
    color: 'rgb(255, 0, 51)',
    fontWeight: 'bold',
  },
}), { index: 1 })

export { useStyles };