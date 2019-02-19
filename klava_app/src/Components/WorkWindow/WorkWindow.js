import React, { Component } from 'react';
import './work_window.css';
import {switchErr, addErr, setErrPos, incSumW, zeroSumW,
finPrnt, pushSpeed, setTxt, addTxt, addInpV, cleanInpV,
 incLine, startPrint, processingInpVal, saveAndCleanValInpv} from  "../../actionCreators.js"
import {store} from "../../redux_store.js"
import { connect}   from 'react-redux';


let mapStateToProps = state => ({err: state.err ,pnl: state.pnl, txt: state.txt})
let mapDispatchToProps = {switchErr, addErr, setErrPos, incSumW, zeroSumW,
finPrnt, pushSpeed, setTxt, addTxt, addInpV, cleanInpV, incLine, startPrint,
 processingInpVal, saveAndCleanValInpv}

let testText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

let TextWindow = p =>
      <div className="text_window">
        {p.text}
      </div>

let CongrText = p =>
      <div className="congr_text" style={{visibility: p.toggle ? "visible" : "hidden"}}>
        <h1>{'Winner'}</h1>
      </div>

let MainInput = p =>
      <input onInput={p.inp} maxLength={p.errP} value={p.val} onFocus={p.foc}/>

let ErrMess = p =>
      <p style={{backgroundColor: "red", visibility: p.err ? "visible" : "hidden"}}>{p.text}</p>

store.subscribe(()=> console.log(store.getState())) // подписочка

class WorkWindow extends Component {
  counter = 0

  inputHandler = e => {
    this.props.processingInpVal(e.target.value)
  }

  speedCounter = 0

  seedTimer = e => {
    if(this.speedCounter !== 0 )return//костыль для срабатывания только при первом фокусе
    let timer = setInterval(() => {
      this.props.pushSpeed(this.props.pnl.sumW * 6)
      this.props.zeroSumW()
    },10000)
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
       console.warn(`fin:${fin}`, checkArr)
       if(fin)/*setTimeout(()=>*/{
        this.props.saveAndCleanValInpv(textValue)
        this.props.incLine()
      }/*,100)*/
      return checkArr.map((el, ind) => {
        let setBack = flag => {
          if(flag === "default") return "gray"
            else if(flag) return "green"
              else return "red"
        }
        return <span key={ind} style={{backgroundColor: setBack(el.f)}}>{el.t}</span>
      })
  }

  componentDidMount(){
    this.props.textSonc(testText)
    this.props.startPrint()
  }

  render(){
    let p = this.props
    return (
      <div className="work_window">
          <TextWindow text={
            !p.pnl.fin ?
            this.textViewer ( p.txt.text[p.txt.currentLine], p.txt.inputValue )
              : "successful"
          }/>
          <MainInput  val={p.txt.inputValue} inp={this.inputHandler} errP={p.err.errPos} foc={this.seedTimer}/>
          <ErrMess err={ p.err.error} text={"Error"}/>
          <CongrText toggle={p.pnl.fin}/>
          <p>{testText}</p>
      </div>
    )
  }
}
WorkWindow = connect(mapStateToProps, mapDispatchToProps)(WorkWindow)
























export default WorkWindow
