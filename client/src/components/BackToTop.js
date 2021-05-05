import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  scrollTop: {
    position: 'fixed',
    zIndex: 1,
    opacity: 0.5,
    left: theme.spacing(1),
    bottom: theme.spacing(4),
    height: '45px',
    width: '45px',
    '@media (min-width:960px)': {
      right: theme.spacing(3),
      height: '60px',
      width: '60px',
    },
    backgroundColor: 'rgb(0,0,205)',
    "&:hover, & .Mui-focusVisible": {
      opacity: 1,
      backgroundColor: 'rgb(0,0,205)',
    }
  },
  button: {
    color: 'rgb(255,255,255)',
    height: '35px',
    width: '35px',
  }
}))

const BackToTop = () => {
  const classes = useStyles();
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  }

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.addEventListener('scroll', checkScrollTop);

  return (
    <div>
      {showScroll ?
        <IconButton className={classes.scrollTop} aria-label="scroll to top of page" onClick={scrollTop}>
          <ArrowUpwardIcon className={classes.button} />
        </IconButton>
        :
        null}
    </div>
  )
}

export default BackToTop;