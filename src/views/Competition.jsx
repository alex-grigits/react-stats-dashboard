import React from 'react';
// material-ui components
import { Grid, withStyles, Paper } from '@material-ui/core';
// custom components
import TableStandings from '../components/TableStandings/TableStandings';
import ListResults from '../components/ListResults/ListResults';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: 10,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const apiKey = '07343b6896a74d57920afd88bed1a68f';
const APIUrl = 'http://api.football-data.org/v2/';

class Competition extends React.PureComponent {
  state ={
    competitionId: this.props.match.params.id,
    matchDay: 1,
    standings: [],
    matchDayResults: []
  }

  componentDidMount() {
    this.getTableStandings(this.state.competitionId);
    this.getMatchDayResults(this.state.competitionId, this.state.matchDay);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getTableStandings(this.state.competitionId);
      this.getMatchDayResults(this.state.competitionId, this.state.matchDay);
    } else if (prevState.matchDay !== this.state.matchDay) {
      this.getMatchDayResults(this.state.competitionId, this.state.matchDay);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      competitionId: nextProps.match.params.id,
      matchDay: 1
    })
  }

  getTableStandings(id) {
    fetch(`${APIUrl}competitions/${id}/standings`, {
      method: 'get',
      headers: new Headers({
        'X-Auth-Token': apiKey
      })
    })
    .then(res => res.json())
    .then(data => {
      const tableTotal = data.standings.filter(table => {
        return table.type === 'TOTAL';
      });
      this.setState({
        standings: tableTotal[0]['table']
      })
    })
    .catch(err => console.log(err));
  }

  getMatchDayResults = (id, matchDay) => {
    fetch(`${APIUrl}competitions/${id}/matches?matchday=${matchDay}`, {
      method: 'get',
      headers: new Headers({
      'X-Auth-Token': apiKey
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        matchDayResults: data.matches
      })
    })
    .catch(err => console.log(err));
  }

  getPrevMatchDay = () => {
    this.setState((prevState, props) => ({matchDay: prevState.matchDay - 1}));
  }

  getNextMatchDay = () => {
    this.setState((prevState, props) => ({matchDay: prevState.matchDay + 1}));
  }

  render () {
    const { classes, match } = this.props;
    const { matchDayResults, standings, matchDay } = this.state;

    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item sm={12} md={6}>
            <Paper className={classes.paper}>
              <ListResults matchDayResults={matchDayResults} getNext={this.getNextMatchDay} getPrev={this.getPrevMatchDay} matchDay={matchDay}/>
            </Paper>
          </Grid>
          <Grid item sm={12} md={6}>
            <Paper className={classes.paper}>
              <TableStandings standings={standings} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
};

export default withStyles(styles)(Competition);
