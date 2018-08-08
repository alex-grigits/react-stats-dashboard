import React from 'react';
// material-ui components
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import ForwardIcon from '@material-ui/icons/ArrowForwardIos';

import MatchesList from './MatchesList';

import './ListResults.css';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing.unit,
  }
});


class ListResults extends React.Component {

    render() {
      const { classes, matchDayResults, getPrev, getNext, matchDay } = this.props;

      return (
        <div className={classes.root}>
          <IconButton className={classes.button} aria-label="Prev" color="primary"
            onClick={() => getPrev()}
            disabled={matchDay <= 1}
          >
            <BackIcon />
          </IconButton>
          <div className="title-block">
            <Typography variant="title" color="primary">
              Matchday {matchDay}
            </Typography>
            <Typography variant="subheading">
              Subheading
            </Typography>
          </div>
          <IconButton className={classes.button} aria-label="Next" color="primary" onClick={() => getNext()}>
            <ForwardIcon />
          </IconButton>

          <MatchesList
            matches={matchDayResults}
          />
        </div>
      )
    }
}

export default withStyles(styles)(ListResults);
