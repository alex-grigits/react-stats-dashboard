import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// material-ui components
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Divider from '@material-ui/core/Divider';


const styles = {
  list: {
    width: 300
  },
  fullList: {
    width: 'auto'
  }
};

class ListCompetitions extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes, competitions, toggleDrawer, handleCompetition, handleSidebarToggle } = this.props;

    return (
      <div className={classes.list}>
        <List component="nav" onClick={handleSidebarToggle}>
          <ListItem
            button
            component={Link}
            to="/"
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
            />
          </ListItem>
          <Divider />
          {competitions.map((competition, id) => {
            return (
              <ListItem
                button
                key={id}
                component={Link}
                to={`/competition/${competition.id}`}
                params={{id: competition.id}}
              >
                  <ListItemText
                    primary={`${competition.name}`}
                    secondary={`${competition.area.name}`}
                  />
                {/* <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon> */}
                
                {/* {this.state.open ? <ExpandLess /> : <ExpandMore />} */}
              </ListItem>)
          })}
          
          {/* <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested} onClick={event=>console.dir(event.target.innerText)}>
                <ListItemText inset primary="Premier League" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Championship" />
              </ListItem>
            </List>
          </Collapse> */}
        </List>
      </div>
    );
  }
}

ListCompetitions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListCompetitions);
