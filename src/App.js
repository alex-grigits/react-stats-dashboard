import React, { Component } from 'react';
import './App.css';
import MenuAppBar from './components/MenuAppBar';
import PersistentDrawer from './components/PersistentDrawer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PersistentDrawer />
      </div>
    );
  }
}

export default App;
