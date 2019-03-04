import React, { Component } from 'react';
import './work_panel.css';
import ChartCanvas from './ChartCanvas/ChartCanvas.js'
import { connect}   from 'react-redux';
import LoadPanel from './LoadPanel/LoadPanel.js'

let mapStateToProps = state => ({txt: state.txt, pnl: state.pnl, err:state.err})

class WorkPanel extends Component {
  width = 300
  height = 200
  resizer(){
    if(window.innerWidth <= 1024 && window.innerWidth > 768 ){
      this.width = 180
      this.height = 160
    }
    if(window.innerWidth <= 1280 && window.innerWidth > 1024 ){
      this.width = 220
      this.height = 160
    }
    if(window.innerWidth <= 1366 && window.innerWidth > 1280 ){
      this.width = 280
      this.height = 150
    }
    if(window.innerWidth <= 1440 && window.innerWidth > 1366 ){
      this.width = 280
      this.height = 200
    }
    if(window.innerWidth <= 1920&& window.innerWidth > 1440 ){
      this.width = 380
      this.height = 320
    }
  }
  render (){
    this.resizer()
    window.onresize = e => {
      this.resizer()
    }
    let p = this.props
    return (
      <div className="work_panel-main">
          <LoadPanel numCur={p.pnl.typedTextLength}
          numFin={p.txt.text.reduce((sum, cur) => sum + cur.length, 0)}
          width = {this.width + 20}
          />
          <ChartCanvas sizes={[this.width,this.height]} history={p.pnl.curSpeed} names={["characters", "time: 1s"]}/>
      </div>
    )
  }
}
WorkPanel = connect(mapStateToProps, {})(WorkPanel)


export default WorkPanel
