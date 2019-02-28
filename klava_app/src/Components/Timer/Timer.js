import React, { Component } from 'react';
import { connect}   from 'react-redux';

let mapStateToProps = state => ({speeds: state.pnl.curSpeed})

class Timer extends Component{
  time = [0,0]
  setTime(){
    console.log("setTime")
    if(this.time[1] === 59){
      this.time[1] = 0
      this.time[0]++
    } else this.time[1]++
    return this.time
  }
  // componentDidMount(){
  //   this.time[1] = 0
  // }
  render(){
    console.log("render", this.props.speeds.length)
    let p = this.props
    return (
      <div className="timer_panel">
        <div className="timer">
          {p.speeds.length}
        </div>
      </div>
    )
  }
}
Timer = connect(mapStateToProps, {})(Timer)

export default Timer
