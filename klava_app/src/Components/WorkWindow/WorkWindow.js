import React, { Component } from 'react';
import './work_window.css';

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
      <input onInput={p.inp} maxLength={p.errP} value={p.val}/>

let ErrMess = p =>
      <p style={{backgroundColor: "red"}}>{p.err ? "Очепятка" : false}</p>

class WorkWindow extends Component {
  state = {text: testText, inputValue: "", error: false, errPos: 999, currentLine: 0, fin: false}
  counter = 0
  textSeparator = (text) => {
    if(!text){
      this.setState({text: this.state.text, inputValue: this.state.inputValue, error: this.state.error, errPos: this.state.errPos, currentLine: this.state.currentLine, fin: true})
      return []
    }
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
    console.dir(e.target)
    // if(this.error){
    //   e.target.value.length = this.state.errPos + 1
    // }
    this.setState({text: this.state.text, inputValue: e.target.value, error: this.state.error, errPos: this.state.errPos, currentLine: this.state.currentLine, fin:this.state.fin})
  }
  textViewer = (text, textValue = "") => {
      console.log("textViewer : => ",text)
      if(!text)return
      let checkArr = []
      let aT = text.split("")
      let aV = textValue.split("")
      aT.forEach((symb, ind) => {
        checkArr.push({t: symb, v: aV[ind], f: aV[ind] ? symb === aV[ind] : "default"})
      })
      console.log(checkArr)
      let errorToggle = checkArr.some(el => !el.f)
      console.log(errorToggle)
      if(errorToggle && this.counter++ === 0)
        this.setState({text: this.state.text, inputValue: this.state.inputValue, error: true, errPos: aV.length, currentLine: this.state.currentLine, fin:this.state.fin})
        else {
          if(!errorToggle && this.counter !== 0 ){
            this.counter = 0
            this.setState({text: this.state.text, inputValue: this.state.inputValue, error: false, errPos: 999, currentLine: this.state.currentLine, fin:this.state.fin})
          }
        }
      let fin = checkArr.every(el => typeof el.f === 'boolean' && el.f)
       if(fin)setTimeout(()=>{
        let newLine = this.state.currentLine + 1
        this.setState({text: this.state.text, inputValue: "", error: this.state.error, errPos: this.state.errPos, currentLine: newLine, fin:this.state.fin})
      },300)
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
    console.log(this.state)
    console.log("errPos", this.state.errPos)
    console.warn(this.state.fin)
    return (
      <div className="work_window">
          <TextWindow text={!this.state.fin ? this.textViewer(this.textSeparator(this.state.text)[this.state.currentLine], this.state.inputValue): "successful"}/>
          <MainInput val={this.state.inputValue} inp={this.inputHandler} errP={this.state.errPos}/>
          <ErrMess err={this.state.error}/>
          <CongrText toggle={this.state.fin}/>
      </div>
    )
  }
}
























export default WorkWindow
