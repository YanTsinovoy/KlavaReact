import React, { Component } from 'react';
import './App.css';
import {Provider, connect}   from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import WorkWindow from './Components/WorkWindow/WorkWindow.js'
import WorkPanel from './Components/Panel/WorkPanel.js'
import {store} from "./redux_store.js"
// import store  from './redux_store.js'
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className ="Main">
            <WorkWindow/>
            <WorkPanel/>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
