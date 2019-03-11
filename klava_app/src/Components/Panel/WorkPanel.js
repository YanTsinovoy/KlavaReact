import React, { Component } from 'react';
import './work_panel.css';
import ChartCanvas from './ChartCanvas/ChartCanvas.js'
import { connect}   from 'react-redux';
import LoadPanel from './LoadPanel/LoadPanel.js'

let mapStateToProps = state => ({txt: state.txt, pnl: state.pnl, err:state.err})

class WorkPanel extends Component {
  state = {
    width : 300,
    height : 200
  }
  resizer(){
    let newWidth = document.getElementById("panel").offsetWidth
    let newHeight = document.getElementById("panel").offsetHeight
    this.setState({width: newWidth,height: newHeight})
  }
  componentDidMount(){
    this.resizer()
    window.onresize = e => {
      console.log(this)
      this.resizer()
    }
  }

  render (){
    let p = this.props
    return (
      <div id="panel">
          <LoadPanel numCur={p.pnl.typedTextLength}
          numFin={p.txt.text.reduce((sum, cur) => sum + cur.length, 0)}
          width = {this.state.width - 20}
          />
          <ChartCanvas width={this.state.width-40} height={this.state.height-80} history={p.pnl.curSpeed} names={["characters", "time: 1s"]}/>
      </div>
    )
  }
}
WorkPanel = connect(mapStateToProps, {})(WorkPanel)


export default WorkPanel
