import React, { Component } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
// custom components
import Dashboard from './views/Dashboard';
import Competition from './views/Competition';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header';

class App extends Component {
  state = {
    competitions: [],
    isLoaded: false,
    sidebarOpen: false
  };

  componentDidMount() {
    const apiKey = '07343b6896a74d57920afd88bed1a68f';
    fetch('http://api.football-data.org/v2/competitions/', {
      method: 'get',
      headers: new Headers({
        'X-Auth-Token': apiKey
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          competitions: data['competitions'].filter(item => {
            return item.plan === 'TIER_ONE';
          })
        });
        // console.log(this.state);
      })
      .catch(err => console.error(err));
  }

  handleSidebarToggle = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };

  handleCompetition = id => {
    console.log(id);
  };

  render() {
    return (
      <div className="wrapper">
        <Sidebar
          handleSidebarToggle={this.handleSidebarToggle}
          open={this.state.sidebarOpen}
          competitions={this.state.competitions}
          handleCompetition={this.handleCompetition}
        />
        <main className="main">
          <Header handleSidebarToggle={this.handleSidebarToggle} />
          <div className="content">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/competition/:id" component={Competition} />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
