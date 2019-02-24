import React, { Component } from 'react';
import './work_panel.css';
import ChartCanvas from './ChartCanvas/ChartCanvas.js'
import { connect}   from 'react-redux';
import LoadPanel from './LoadPanel/LoadPanel.js'

let mapStateToProps = state => ({txt: state.txt, pnl: state.pnl, err:state.err})

class WorkPanel extends Component {
  render (){
    console.log("panel render")
    let p = this.props
    return (
      <div className="work_panel-main">
          <LoadPanel numCur={p.pnl.typedTextLength}
          numFin={p.txt.text.reduce((sum, cur) => sum + cur.length, 0)}
          width = {320}
          />
          <div>{
            `curSpeed: ${p.pnl.curSpeed[p.pnl.curSpeed.length-1]}; errors: ${p.err.errs}; typed text: ${p.pnl.typedTextLength}`
            + `; left: ${p.txt.text.reduce((sum, cur) => sum + cur.length, 0) - p.pnl.typedTextLength}`
          }</div>
          <ChartCanvas sizes={[300,200]} history={p.pnl.curSpeed} names={["characters", "time: 2s"]}/>
      </div>
    )
  }
}
WorkPanel = connect(mapStateToProps, {})(WorkPanel)


export default WorkPanel
