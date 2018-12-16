import React, { Component, Fragment } from 'react';

import AppNavbar from './components/AppNavbar';
import NotesList from './components/NotesList';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render() {
    return (
      <Fragment>
        <AppNavbar />
        <NotesList />
      </Fragment>
    );
  }
}

export default App;
