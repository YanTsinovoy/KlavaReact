import React, { Component } from 'react';
import './App.css';
import {Provider, connect}   from 'react-redux';
import thunk from 'redux-thunk';
import {store} from "./redux_store.js";
import GamePage from "./Pages/GamePage.js"
import FinalPage from "./Pages/FinalPage.js"
import StartPage from "./Pages/StartPage.js"
import { Switch, Route } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <div className = "App">
          <Switch>
          	<Route exact path="/" component={StartPage} />
      			<Route exact path="/klava" component={GamePage} />
            <Route exact path="/fin" component={FinalPage} />
  		    </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
