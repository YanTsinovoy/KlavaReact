import React, { Component } from 'react';
import './game.css'
import { connect} from 'react-redux';
import {setWidth} from "../../actionCreators.js"
let mapStateToProps = state => ({game: state.game})

class Game extends Component {
  componentDidMount(){
    this.props.setWidth(document.getElementById("game").offsetWidth)
  }
  render(){
    const p = this.props
    return (
      <div id="game">
          <div id="enemy" style={{left: p.game.enX + "px"}}></div>
          <div id="player" ></div>
      </div>
    )
  }
}
Game = connect(mapStateToProps, {setWidth})(Game)

export default Game
