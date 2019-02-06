import React, { Component } from 'react';
import './App.css';
import {Provider, connect}   from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import WorkWindow from './Components/WorkWindow/WorkWindow.js'
// import store  from './redux_store.js'
class App extends Component {
  render() {
    return (
      <div className="App">
        <WorkWindow/>
      </div>
    );
  }
}

export default App;
