import React, { Component } from 'react';
import { connect} from 'react-redux';
import {store} from "../redux_store.js";
import { Redirect } from "react-router-dom";
import "./final_page.css"

let mapStateToProps = state => ({
  errors: state.err.errs,
  typed: state.pnl.typedTextLength,
  speeds: state.pnl.curSpeed,
  time: state.time,
  final: state.game.fin
})

let FinalPage = p => {
  if(p.final === "during")return (
    <Redirect  to=""/>
  )
  console.warn(p.typed)
  return (
    <div className="final_page">
      <div className="res">{p.final}</div>
      <div className="results">Typed text: {p.typed}</div>
      <div className="results">{p.time.m + " min; " + p.time.s + " sec;"}</div>
      <div className="results">
        Average speed: {Math.round(p.speeds.reduce((prev, el, ind, arr)=>{
        if(ind === arr.length - 1) return prev / arr.length
        return prev + el
      }, 0))}</div>
      <div className="results">errors: {p.errors}</div>
    </div>
  )
}

FinalPage = connect(mapStateToProps, {})(FinalPage)

export default FinalPage
