import React, { Component } from 'react';
import './text_viewer.css'
import {store} from "../../redux_store.js"
import { connect}   from 'react-redux';

let mapStateToProps = state => ({text: state.txt.text})

let TextViewer = p => (
  <div className="text_viewer">
    {p.text.map((line, ind) => <p key={ind} className="text_viewer-line">{line}</p>)}
  </div>
)

TextViewer = connect(mapStateToProps, {})(TextViewer)



export default TextViewer
