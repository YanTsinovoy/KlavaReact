
//errorsReducer
let switchErr = () => ({type: "SWITCH_ERROR"})
let addErr = () => ({type: "ADD_ERROR"})
let setErrPos = position => ({type: "SET_ERRPOS", pos: position })
//errorsReducer end

//panelReduser
let incSumW = () => ({type: 'INC_SW'})
let zeroSumW = () => ({type: 'ZERO_SW'})
let finPrnt = () => ({type: "FIN_PRINT"})
let startPrint = () => ({type: "START_PRINT"})
let pushSpeed = nS => ({type:'PUSH_SPEED', speed: nS})
let incTxt = () => ({type: 'INC_TXT_LN'})
//panelReduser end

//textWorkReducer
let addTxt = txt => ({type: "ADD_TEXT", text: txt})
let addInpV = val => ({type:"ADD_INPV", value: val })
let cleanInpV = () => ({type:"CLEAN_INPV"})
let incLine = () => ({type: "INC_LINE"})
let textLen = l => ({type: "SET_TEXT_LENGTH", len: l})
//textWorkReducer end

//asyncCrator
let textSonc = txt => {
  return function (dispatch){
    dispatch(addTxt(txt))
    dispatch(textLen(txt.length))
  }
}
//asyncCreator End 
















export {switchErr, addErr, setErrPos, incSumW, zeroSumW,
finPrnt, pushSpeed, incTxt, addTxt, addInpV, cleanInpV, incLine, startPrint, textSonc}
