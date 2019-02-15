import React, { Component } from 'react';
import './work_panel.css';
import { connect}   from 'react-redux';

let mapStateToProps = state => ({txt: state.txt})

let LoadPanel = p => {
  let loadLine = p.numCur / (p.numFin / 200)
  console.log("panel ind", p.numCur + " : " + p.numFin)
  return (
    <div className="load_panel" style={{width: "200px"}}>
      <div className="load_panel-indicator" style={{width: `${loadLine}px`}}></div>
    </div>
  )
}

class WorkPanel extends Component {
  valueLength = 0//TEST
  finLength = 0
  render (){
    console.log("panel render")
    let p = this.props
    this.valueLength += p.txt.inputValue.length//TEST
    p.txt.text.forEach(el => this.finLength += el.length)
    return (
      <div className="work_panel-main">
          <LoadPanel numCur={this.valueLength} numFin={this.finLength}/>
      </div>
    )
  }
}
WorkPanel = connect(mapStateToProps, {})(WorkPanel)


export default WorkPanel
