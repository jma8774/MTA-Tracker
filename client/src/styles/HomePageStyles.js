import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  accordionRoot: {
    '&.MuiAccordion-root': {
      backgroundColor: 'transparent',
      color: 'rgb(255,255,255)'
    },
  },
  accordionSummaryContent: {
    '&.MuiAccordionSummary-content': {
      flexGrow: 0,
    }
  },
  expandClick: {
    display: 'inline-block',
    position: 'relative', 
    padding: theme.spacing(0.5),
  },
  box: {
    padding: theme.spacing(3),
    backgroundColor: "rgba(0,0,0,0.3)",
  }
}))

export { useStyles };