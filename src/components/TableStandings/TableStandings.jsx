import React from 'react';
import PropTypes from 'prop-types';
// material-ui components
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '70%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    maxWidth: 800,
  },
});

class TableStandings extends React.Component {


  render() {
    const {classes, standings} = this.props;

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell numeric padding="dense">Pos</TableCell>
            <TableCell padding="dense">Team</TableCell>
            <TableCell numeric padding="dense">G</TableCell>
            <TableCell numeric padding="dense">W</TableCell>
            <TableCell numeric padding="dense">D</TableCell>
            <TableCell numeric padding="dense">L</TableCell>
            <TableCell numeric padding="dense">GD</TableCell>
            <TableCell numeric padding="dense">P</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {standings.map((team, id) => {
            return (
              <TableRow key={id}>
                <TableCell numeric padding="dense">{team.position}</TableCell>
                <TableCell padding="dense">
                  {team.team.name}
                </TableCell>
                <TableCell numeric padding="dense">{team.playedGames}</TableCell>
                <TableCell numeric padding="dense">{team.won}</TableCell>
                <TableCell numeric padding="dense">{team.draw}</TableCell>
                <TableCell numeric padding="dense">{team.lost}</TableCell>
                <TableCell numeric padding="dense">{team.goalDifference}</TableCell>
                <TableCell numeric padding="dense">{team.points}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    )
  }
}

export default withStyles(styles)(TableStandings);
