import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  accordionRoot: {
    '&.MuiAccordion-root': {
      backgroundColor: 'rgba(25,25,25,0.5)',
      color: 'rgb(255,255,255)',
      marginBottom: theme.spacing(2),
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
  }
}), {index: 1})

export { useStyles };