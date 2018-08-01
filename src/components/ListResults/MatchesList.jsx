import React from 'react';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import './MatchesList.css';

class MatchesList extends React.Component {

  render () {
    const {matches} = this.props;

    return (
      <div>
        {
          matches.map((match, id) => {
            return (
              <ListItem key={id}>
                <div className="container">
                  <div className="col-2">
                    {match.homeTeam.name}
                  </div>
                  <div className="col-1">
                    <span className="goals">
                      {match.score.fullTime.homeTeam !== null ? match.score.fullTime.homeTeam : '-'}
                    </span>
                    -
                    <span className="goals">
                      {match.score.fullTime.awayTeam !== null ? match.score.fullTime.awayTeam : '-'}
                    </span>
                  </div>
                  <div className="col-2">
                    {match.awayTeam.name}
                  </div>
                </div>
              </ListItem>
            )
          })
        }
      </div>
    )
  }
}

export default MatchesList;
