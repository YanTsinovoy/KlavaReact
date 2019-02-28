import React, { Component } from 'react';

let LoadPanel = p => {
  let loadLine = p.numCur / (p.numFin / p.width)
  console.log("panel ind", p.numCur + " : " + p.numFin)
  return (
    <div className="load_panel" style={{width: p.width}}>
      <div className="load_panel-indicator" style={{
        width: `${loadLine >= p.width ? p.width : loadLine}px`
      }}></div>
    </div>
  )
}

export default LoadPanel