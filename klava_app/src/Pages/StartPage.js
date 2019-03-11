import React, { Component } from 'react';
import { connect} from 'react-redux';
import {store} from "../redux_store.js";
import { Link } from "react-router-dom";
import axios from "axios";
import {addTxt, setGameLength, startPrint} from  "../actionCreators.js"
import { Redirect } from "react-router-dom";
import "./final_page.css"
class StartPage extends Component {
  state = {
    canBegin: false
  }
  addTextHandler = () => {
    axios({
      url: "https://baconipsum.com/api/?type=meat-and-filler"
    })
      .then(res => {
        let txt = res.data.join(" ")
        this.props.addTxt(txt)
        this.props.setGameLength(txt.length)
        this.props.startPrint()
        this.setState({canBegin: true})
      })
      .catch(err => console.log(err))
  }
  inpTextHandler = e => {
      this.props.addTxt(e.target.value)
      this.props.setGameLength(e.target.value.length)
      this.props.startPrint()
      this.setState({canBegin: true})
  }
  render(){
    if(this.state.canBegin){
      return (
        <Redirect  to="klava"/>
      )
    }
    return (
      <div className="start_page">
        <div className="text_options">
          <h2>Select option</h2>
          <div className="inp">
            Insert your text</div>
          <input onBlur={this.inpTextHandler} />
          <div className="btn" onClick={this.addTextHandler} >Random text</div>
        </div>
      </div>
    )
  }
}
StartPage = connect(state=>({}), {addTxt, setGameLength, startPrint})(StartPage)
export default StartPage
