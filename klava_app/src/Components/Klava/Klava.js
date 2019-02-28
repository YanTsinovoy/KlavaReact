import React, { Component } from 'react';
import './klava.css'
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
    }
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
            console.log(button[0])
            return (
            <div className="button"
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

export default Klava
