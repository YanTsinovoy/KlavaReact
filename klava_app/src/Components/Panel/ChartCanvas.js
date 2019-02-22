import React, { Component } from 'react';

class ChartCanvas extends Component {
  render (){
    return (
      <div className="chart_panel">
        <canvas ref="canvas" width={300} height={200} style={{backgroundColor: "red"}}/>
      </div>
    )
  }
}

export default ChartCanvas
