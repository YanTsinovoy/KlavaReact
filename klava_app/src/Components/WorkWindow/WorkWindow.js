import React, { Component } from 'react';
import './work_window.css';
import {plGo ,setGameLength, timeAndEnemy, switchErr, addErr, setErrPos, incSumW, zeroSumW,
finPrnt, pushSpeed, setTxt, addTxt, addInpV, cleanInpV,
 incLine, startPrint, processingInpVal, saveAndCleanValInpv, inpTime} from  "../../actionCreators.js"
import {store} from "../../redux_store.js"
import { connect}   from 'react-redux';
import {testText, testText2} from './testText.js'
import axios from "axios";
import { Redirect } from "react-router-dom";


let mapStateToProps = state => ({
  err: state.err ,
  pnl: state.pnl,
  txt: state.txt,
  game: state.game
})
let mapDispatchToProps = {plGo, setGameLength, switchErr, addErr, setErrPos, incSumW, zeroSumW,
finPrnt, pushSpeed, setTxt, addTxt, addInpV, cleanInpV, incLine, startPrint,
 processingInpVal, saveAndCleanValInpv, timeAndEnemy}

let TextWindow = p =>
      <div className="text_window">
        {p.text}
      </div>

let CongrText = p =>
      <div className="congr_text" style={{visibility: p.toggle ? "visible" : "hidden"}}>
        <h1>{'Winner'}</h1>
      </div>

let MainInput = p =>
      <textarea
        className="main_input"
        onChange={p.inp} maxLength={p.errP}
        value={p.val} onFocus={p.foc}
        onBlur={p.blur}
        style={{border: p.err ? `2px solid red` : "none"}}
        placeholder="START"
      ></textarea>

let ErrMess = p =>(
  <div className="error_mess" style={{backgroundColor: "red", visibility: p.err ? "visible" : "hidden"}}>
    {p.text}
  </div>
)

store.subscribe(()=> console.log(store.getState())) // подписочка

class WorkWindow extends Component {
  counter = 0

  inputHandler = e => {
    if(!this.props.pnl.fin){
       this.props.processingInpVal(e.target.value)
        if(!this.props.err.error) this.props.plGo()
    }
  }

  firstFocus = 0
  timer = null
  seedTimer = e => {
    if(this.firstFocus !== 0 )return//костыль для срабатывания только при первом фокусе
    this.timer = setInterval(() => {
      this.props.timeAndEnemy()
      this.props.pushSpeed(this.props.pnl.sumW * 60)
      this.props.zeroSumW()
    },1000)
  }
  inpBlur = e => {
    this.props.zeroSumW()
    clearInterval(this.timer)
    this.firstFocus = 0
  }

  textViewer = (text, textValue = "") => {
      if(!text){
        this.props.finPrnt()
        return
      }
      let checkArr = []
      let aT = text.split("")
      let aV = textValue.split("")
      aT.forEach((symb, ind) => {
        checkArr.push({t: symb, v: aV[ind], f: aV[ind] ? symb === aV[ind] : "default"})
      })
      let errorToggle = checkArr.some(el => !el.f)
      if(errorToggle && this.counter++ === 0){
        this.props.switchErr()
        this.props.addErr()
        this.props.setErrPos(aV.length)
      } else {
          if(!errorToggle && this.counter !== 0 ){
            this.counter = 0
            this.props.switchErr()
            this.props.setErrPos(999)
          }
        }
      let fin = checkArr.every(el => typeof el.f === 'boolean' && el.f)
       if(fin)/*setTimeout(()=>*/{
        this.props.saveAndCleanValInpv(textValue)
        this.props.incLine()
      }/*,100)*/
      return checkArr.map((el, ind) => {
        let setBack = flag => {
          if(flag === "default") return "#d1cfcd"
            else if(flag) return "green"
              else return "red"
        }
        return <span className="letter" key={ind} style={
          {backgroundColor: setBack(el.f)}
        }>{el.t}</span>
      })
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  render(){
    let p = this.props
    if(p.pnl.fin){
      clearInterval(this.timer)
    }
    if(p.txt.text.length === 0 ){
      return (
        <Redirect  to=""/>
      )
    }
    if(p.game.fin === "LOSE" ||  p.game.fin === "WIN" ) {
      return (
        <Redirect  to="fin"/>
      )
    }
    return (
      <div className="work_window">
          <TextWindow text={
            p.pnl.fin ? "successfull"
              : this.textViewer ( p.txt.text[p.txt.currentLine], p.txt.inputValue )
          }/>
          <MainInput  val={p.txt.inputValue}
          inp={this.inputHandler} errP={p.err.errPos}
          foc={this.seedTimer}
          blur={this.inpBlur}
          err={ p.err.error}/>
          <ErrMess err={ p.err.error} text={"Error"}/>
          <CongrText toggle={p.pnl.fin}/>
      </div>
    )
  }
}
WorkWindow = connect(mapStateToProps, mapDispatchToProps)(WorkWindow)




export default WorkWindow
