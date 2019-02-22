import React, { Component } from 'react';
import './work_panel.css';
import ChartCanvas from "./ChartCanvas.js"
import { connect}   from 'react-redux';


let mapStateToProps = state => ({txt: state.txt, pnl: state.pnl})

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
  render (){
    console.log("panel render")
    let p = this.props
    return (
      <div className="work_panel-main">
          <LoadPanel numCur={p.pnl.typedTextLength}
          numFin={p.txt.text.reduce((sum, cur) => sum + cur.length, 0)}/>
          <ChartCanvas/>
      </div>
    )
  }
}
WorkPanel = connect(mapStateToProps, {})(WorkPanel)


export default WorkPanel
