import React, { Component } from 'react';
import './klava.css'
import { connect}   from 'react-redux';

let mapStateToProps = state => ({
  text: state.txt.text,
  textInp: state.txt.inputValue,
  ind: state.txt.currentLine,
  errorToggle: state.err.error
})

class Klava extends Component {
  state = {
    english: {
      line0:[
        ["~", "`"], ["!","1"], ["@","2"], ["#","3"],
        ["$", "4"], ["%", "5"], ["^", "6"], ["&", "7"],
        ["*", "8"], ["(", "9"], [")", "0"], ["_", "-"], ["+", "="], ["Back"]
      ],
      line1: [
        ["Tab"],[ "Q"], ["W"], ["E"], ["R"], ["T"], ["Y"],
         ["U"], ["I"], ["O"], ["P"], ["[", "{"], ["]", "}"], [String.fromCharCode(92), "|"]
      ],
      line2: [["CapsLock"],["A"],["S"], ["D"], ["F"], ["G"],
       ["H"], ["J"], ["K"], ["L"], [";", ":"],
       ["'", '"'], [String.fromCharCode(92)], ["Enter"]
     ],
      line3: [["Shift"], [String.fromCharCode(92), "|"], ["Z"], ["X"], ["C"], ["V"], ["B"],
      ["N"],["M"],[",","<"], [".", ">"], ["/", "?"], ["Shift"]
    ],
      line4:[
        ["Ctrl"], ['Fn'], ["Alt"], ["Space"], ["AltGr"], ["PrtSc"], ["Ctrl"]
      ],
    },
  }
  componentDidMount(){
    let p = this.props

  }
  currentSymbol(text1, text2, currentIndex){
    if(!text2.length)return ""
    let str2 = text2[currentIndex] ? text2[currentIndex] : ""
    let currentSymb = str2.slice((text1.length -1), text1.length)
    return currentSymb
  }
  badSymbol(textInp,errorT){
    if(!errorT)return
    return textInp.slice(textInp.length-1, textInp.length )
  }

  klavaPainter(){
    let res = []
    let klavaObj = this.state.english
    for(let x in klavaObj){
      res.push(klavaObj[x])
    }
    return res.map((line, index)=> (
      <div className={"klava_line"} id={"line"+index}>
        {line.map(
          (button, ind) => {
            let curBtn = this.currentSymbol(this.props.textInp, this.props.text, this.props.ind)
            let badBtn = this.badSymbol(this.props.textInp, this.props.errorToggle)
            let space = button[0] === "Space" ? " ": button[0]
            let checker = symb => {
              if(!symb) return
              return symb.toUpperCase() === button[0] ||
               symb.toUpperCase() === space ||
               symb.toUpperCase() === button[1]
            }
            !checker(badBtn) || console.error(button[0])
            return (
            <div className="button"
            style={
              {
                background: checker(curBtn) ? "green" :
                checker(badBtn) ? "red" : null
              }
            }
            id={button[0] === String.fromCharCode(92) ? "bSlash" :
            button[0] === "Shift" || button[0] === "Ctrl" ? button[0] + ind : button[0]}>
              <span>{button[0] === "Space" ? " ": button[0]}</span>
              {button.length > 1 ? <span>{button[1]}</span> : false}
            </div>)
          }
        )}
      </div>
    ))
  }
  render(){
    return (
      <div className="main_klava">
        {this.klavaPainter()}
      </div>
    )
  }
}
Klava = connect(mapStateToProps,{})(Klava)
export default Klava
