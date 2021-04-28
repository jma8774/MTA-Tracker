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
    textShadow: "4px 4px rgba(28,28,30,0.9)",
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
      fontFamily: 'Montserrat, san-serif',
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
    boxShadow: '0 0 2px 5px rgba(0,0,0,0.5)',
    marginBottom: theme.spacing(3),
  },
  textField: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    fontFamily: "Montserrat, san-serif",
    padding: theme.spacing(0.75),
    marginBottom: theme.spacing(3)
  },
  helperTextRoot: {
    fontFamily: 'Montserrat, san-serif',
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
    fontFamily: "Montserrat, san-serif"
  },
  disabled: {
    pointerEvents: 'none',
  },
}), {index: 1})

export { useStyles };