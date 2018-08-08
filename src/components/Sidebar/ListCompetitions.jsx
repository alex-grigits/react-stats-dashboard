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
    open: -1
  };

  handleClick = (id, event) => {
    this.setState(state => ({ open: id }));
  };

  render() {
    const { classes, areas, toggleDrawer, handleSidebarToggle } = this.props;

    return (
      <div className={classes.list}>
        <List component="nav">
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
          { areas.length !== 0 && areas.map((area, id) => {
            return (
              <div key={id}>
                <ListItem
                  button
                  id={id}
                  onClick={(e) => this.handleClick(id, e)}
                >
                    <ListItemText
                      primary={`${area.name}`}
                      secondary={`${area.competitions.length} competition${area.competitions.length > 1 ? 's' : ''}`}
                    />
                  {/* <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon> */}
                  
                  {this.state.open === id ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                
                <Collapse in={this.state.open === id} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {area.competitions.map((competition, id) => {
                      return (
                        <ListItem
                          key={id}
                          button
                          className={classes.nested}
                          component={Link}
                          to={`/competition/${competition.id}`}
                          params={{id: competition.id}}
                          onClick={handleSidebarToggle}
                        >
                          <ListItemText primary={`${competition.name}`} />
                        </ListItem>
                      )
                    })
                    }
                  </List>
                </Collapse>
              </div>)
          })}
        </List>
      </div>
    );
  }
}

ListCompetitions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListCompetitions);
