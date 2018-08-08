import React, { Component } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
// custom components
import Dashboard from './views/Dashboard';
import Competition from './views/Competition';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

const apiKey = '07343b6896a74d57920afd88bed1a68f';

class App extends Component {
  state = {
    areas: [],
    isLoaded: false,
    sidebarOpen: false,
    title: 'Dashboard'
  };

  componentDidMount() {
    this.getListCompetitions();
  }

  getListCompetitions = () => {
    fetch('http://api.football-data.org/v2/competitions/', {
      method: 'get',
      headers: new Headers({
        'X-Auth-Token': apiKey
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState(
          {
            areas: this.associationOfCompetitionsByCountries(
              this.filterCompetitions(data)
            )
          },
          () => console.log(this.state.competitions)
        );
      })
      .catch(err => console.error(err));
  };

  filterCompetitions = data => {
    return data['competitions'].filter(item => {
      return item.plan === 'TIER_ONE';
    });
  };

  associationOfCompetitionsByCountries = data => {
    let currentIndex = 0;
    const competitionsByCountries = data.reduce(
      (result, currentCompetition) => {
        if (result.length === 0) {
          return [
            {
              name: currentCompetition.area.name,
              competitions: [currentCompetition]
            }
          ];
        } else if (
          !this.isObjectInArray(result, currentCompetition.area.name)
        ) {
          currentIndex++;
          return [
            ...result,
            {
              name: currentCompetition.area.name,
              competitions: [currentCompetition]
            }
          ];
        } else {
          let competitions = result[currentIndex].competitions;
          let newResult = result.filter((item, i) => i !== currentIndex);

          return [
            ...newResult,
            {
              name: currentCompetition.area.name,
              competitions: [...competitions, currentCompetition]
            }
          ];
        }
      },
      []
    );

    return competitionsByCountries;
  };

  isObjectInArray = (arr, value) => {
    let result = arr.filter(item => item.name === value);
    return result.length > 0;
  };

  handleSidebarToggle = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  };

  render() {
    return (
      <div className="wrapper">
        <Sidebar
          handleSidebarToggle={this.handleSidebarToggle}
          open={this.state.sidebarOpen}
          areas={this.state.areas}
        />
        <main className="main">
          <Header
            handleSidebarToggle={this.handleSidebarToggle}
            title={this.state.title}
          />
          <div className="content">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/competition/:id" component={Competition} />
            </Switch>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
