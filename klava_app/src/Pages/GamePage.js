import React, { Component } from 'react';
import '../App.css';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import WorkWindow from '../Components/WorkWindow/WorkWindow.js';
import WorkPanel from '../Components/Panel/WorkPanel.js';
import TextViewer from '../Components/TextViewer/TextViewer.js';
import Klava from '../Components/Klava/Klava.js';
import Timer from '../Components/Timer/Timer.js';
import Game from '../Components/Game/Game.js';
import IndicatorsPanel from '../Components/Panel/IndicatorsPanel/IndicatorsPanel.js'

export default class GamePage extends Component {
  render(){
    return (
      <>
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
      </>
    )
  }
}
