import React from 'react';
import PropTypes from 'prop-types';
// material-ui components
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
// custom components
import ListCompetitions from './ListCompetitions';


const styles = {

};

class Sidebar extends React.Component {
  state = {
    left: this.props.open
  };

  toggleDrawer = () => {
    this.props.handleSidebarToggle();
    this.setState({
      left: !this.state.open
    });
  };

  render() {
    const { classes, open, handleSidebarToggle, competitions, handleCompetition } = this.props;

    return (
      <div className={classes.root}>
        <Drawer open={open} onClose={handleSidebarToggle}>
          <div
            tabIndex={0}
            role="button"
          >
            <ListCompetitions
              competitions={competitions}
              handleCompetition={handleCompetition}
              handleSidebarToggle={handleSidebarToggle}
            />
          </div>
        </Drawer>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sidebar);
