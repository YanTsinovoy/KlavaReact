import React, { Component } from 'react';


let TextWindow = p =>
      <div>
        {p.text}
      </div>


let MainInput = p =>
      <input onInput={p.inp} maxLength={p.errP}/>

let ErrMess = p =>
      <p style={{backgroundColor: "red"}}>{p.err ? "Очепятка" : false}</p>

class WorkWindow extends Component {
  state = {text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", inputValue: "", error: false, errPos: 999}
  counter = 0
  inputHandler = e => {
    console.dir(e.target)
    // if(this.error){
    //   e.target.value.length = this.state.errPos + 1
    // }
    this.setState({text: this.state.text, inputValue: e.target.value, error: this.state.error, errPos: this.state.errPos})
  }
  textViewer = (text, textValue = "") => {
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
        this.setState({text: this.state.text, inputValue: this.state.inputValue, error: true, errPos: aV.length})
        else {
          if(!errorToggle && this.counter !== 0 ){
            this.counter = 0
            this.setState({text: this.state.text, inputValue: this.state.inputValue, error: false, errPos: 999})
          }
        }
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
    return (
      <div className="work_window">
          <TextWindow text={this.textViewer(this.state.text, this.state.inputValue)}/>
          <MainInput inp={this.inputHandler} errP={this.state.errPos}/>
          <ErrMess err={this.state.error}/>
      </div>
    )
  }
}
























export default WorkWindow
