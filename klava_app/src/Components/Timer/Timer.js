import React, { Component } from 'react';
import { connect}   from 'react-redux';
import "./timer.css"

let mapStateToProps = state => ({min: state.time.m, sec: state.time.s })

class Timer extends Component {
    state = {x: 0, y:0}
    addZero = num => num <= 9 ? "0" + num : num
    mouseHandler = e => {
      this.setState({
        x: e.clientX - e.target.offsetLeft,
        y: e.clientY - e.target.offsetTop
      })
    }
    render(){
      let p = this.props
      let s = this.state
      return (
        <div className="timer_panel"
          style={
            {
              backgroundImage:` radial-gradient(circle farthest-corner at ${s.x}px ${s.y}px, #eaedec60, #00000090)`
            }
          }
          onMouseMove={this.mouseHandler}
        >
          <div className="timer">
            <div className="time">{this.addZero(p.min)}</div>
            <p className="time-label">MINUTES</p>
            <div className="time">{this.addZero(p.sec)}</div>
            <p className="time-label">SECONDS</p>
          </div>
        </div>
      )
    }
}
Timer = connect(mapStateToProps, {})(Timer)

export default Timer
