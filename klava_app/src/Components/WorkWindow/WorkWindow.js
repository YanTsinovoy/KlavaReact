import React, { Component } from 'react';
import './work_window.css';
import {switchErr, addErr, setErrPos, incSumW, zeroSumW,
finPrnt, pushSpeed, incTxt, addTxt, addInpV, cleanInpV, incLine} from  "../../actionCreators.js"
import {store} from "../../redux_store.js"
import {Provider, connect}   from 'react-redux';

let mapStateToProps = state => ({err: state.err ,pnl: state.pnl, txt: state.txt})
let mapDispatchToProps = {switchErr, addErr, setErrPos, incSumW, zeroSumW,
finPrnt, pushSpeed, incTxt, addTxt, addInpV, cleanInpV, incLine}

let testText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

let TextWindow = p =>
      <div className="text_window">
        {p.text}
      </div>

let CongrText = p =>
      <div className="congr_text" style={{visibility: p.toggle ? "visible" : "hidden"}}>
        <h1>{'Поздравляю засранец'}</h1>
      </div>

let MainInput = p =>
      <input onInput={p.inp} maxLength={p.errP} value={p.val} onFocus={p.foc}/>

let ErrMess = p =>
      <p style={{backgroundColor: "red"}}>{p.err ? "Очепятка" : false}</p>

class WorkWindow extends Component {
  state = {text: testText, inputValue: "", currentLine: 0}
  counter = 0
  textSeparator = (text) => {
    if(!text) return []
    let resArr = []
  	let resStr = ""
  	let obj = {str: "", words: 0, symb: 0}
  	let cW = 8
  	let cS = 45
  	text.split("").forEach ((el, ind) => {
  		obj.str += el
  		if(el === " "){
  			obj.words++
  			obj.symb += obj.str.length
  			if(obj.symb <= cS || obj.words <= cW){
  				resStr += obj.str
  				obj.str = ""
              } else {
  				resArr.push(resStr.slice(0, resStr.length - 1))
  				resStr = ""
  				resStr += obj.str
  				obj.str = ""
  				obj.words = 0
  			}
  		}
  	})
  	return resArr
  }
  inputHandler = e => {
    console.log(e.target.value)
  //  console.log("target",e.target.value)
  //  console.log(this.props)
    this.props.incSumW()
    this.props.addInpV(e.target.value)
  //  console.log("state",this.props.txt.inputValue)
    this.setState({text: this.state.text, inputValue: e.target.value, currentLine: this.state.currentLine})
  }
  speedCounter = 0
  seedTimer = e =>{
    if(this.speedCounter !== 0 )return//костыль для срабатывания только при первом фокусе
    let timer = setInterval(() => {
      this.props.pushSpeed(this.props.pnl.sumW * 6)
      this.props.zeroSumW()
    },10000)
  }
  textViewer = (text, textValue = "") => {
      console.log("textViewer : => ",text, textValue)
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
      console.log(checkArr)
      let errorToggle = checkArr.some(el => !el.f)
      console.log(errorToggle)
      if(errorToggle && this.counter++ === 0){
        let errors = this.state.errs
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
       if(fin)setTimeout(()=>{
        let newLine = this.state.currentLine + 1
      //  this.props.cleanInpV()
      //  this.props.incLine()
        console.warn("hello")
        this.setState({text: this.state.text, inputValue: "", currentLine: newLine})
      },100)
      return checkArr.map((el, ind) => {
        let setBack = flag => {
          if(flag === "default") return "gray"
            else if(flag) return "green"
              else return "red"
        }
        return <span key={ind} style={{backgroundColor: setBack(el.f)}}>{el.t}</span>
      })
  }
  render(){
    let p = this.props
    //console.log("txt", p.txt.inputValue)
    console.log(this.state.inputValue)
    return (
      <div className="work_window">
          <TextWindow text={!p.pnl.fin ? /*this.textViewer(p.txt.text[p.txt.currentLine], p.txt.inputValue)*/this.textViewer(this.textSeparator(this.state.text)[this.state.currentLine], this.state.inputValue): "successful"}/>
          <MainInput val={this.state.inputValue} inp={this.inputHandler} errP={p.err.errPos} foc={this.seedTimer}/>
          <ErrMess err={p.err.error}/>
          <CongrText toggle={p.pnl.fin}/>
          <p>errors: {p.err.errs} speed: {p.pnl.curSpeed[p.pnl.curSpeed.length - 1]} s/m </p>
          {p.txt.inputValue}
      </div>
    )
  }
}
WorkWindow = connect(mapStateToProps, mapDispatchToProps)(WorkWindow)
























export default WorkWindow
