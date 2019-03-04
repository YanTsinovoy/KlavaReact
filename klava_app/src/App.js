import React, { Component } from 'react';
import './App.css';
import {Provider, connect}   from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import WorkWindow from './Components/WorkWindow/WorkWindow.js';
import WorkPanel from './Components/Panel/WorkPanel.js';
import TextViewer from './Components/TextViewer/TextViewer.js';
import {store} from "./redux_store.js";
import Klava from './Components/Klava/Klava.js';
import Timer from './Components/Timer/Timer.js';
import Game from './Components/Game/Game.js';
import IndicatorsPanel from './Components/Panel/IndicatorsPanel/IndicatorsPanel.js'

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <div className = "App">
          <div className ="Main">
            <TextViewer/>
            <Game />
            <WorkPanel/>
          </div>
          <div className = "Work">
            <Timer />
            <WorkWindow/>
            <IndicatorsPanel/>
          </div>
          <Klava/>
        </div>
      </Provider>
    );
  }
}

export default App;
