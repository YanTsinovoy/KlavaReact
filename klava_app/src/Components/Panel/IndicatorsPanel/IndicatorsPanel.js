import React, { Component } from 'react';
import { connect}   from 'react-redux';
import './indicators_panel.css'

let mapStateToProps = state => ({
  typedText: state.pnl.typedTextLength,
  speed: state.pnl.curSpeed,
  text: state.txt.text,
  errors:state.err.errs
})

let IndicatorsPanel = p => (
  <div className="indicators_panel">
    <div className="nameplate">
      <span className="label">speed: </span>
      <span className="value">{p.speed[p.speed.length - 1]} m/s</span>
    </div>
    <div className="nameplate">
      <span className="label">errors: </span>
      <span className="value">{p.errors}</span>
    </div>
    <div className="nameplate">
      <span className="label">typed text: </span>
      <span className="value">{p.typedText}</span>
    </div>
    <div className="nameplate">
      <span className="label">left: </span>
      <span className="value">
      {p.text.reduce(
        (sum, cur) => sum + cur.length, 0
      ) - p.typedText}
      </span>
    </div>
  </div>
)
IndicatorsPanel = connect(mapStateToProps, {})(IndicatorsPanel)

export default IndicatorsPanel
